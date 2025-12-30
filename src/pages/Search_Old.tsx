// Library import
import { useState } from 'react'

// Component imports
import { ToggleSwitch, Select, NumberInput, NumberInputWithButton } from 'components/Forms'
import { Button } from 'components/Forms'

// Style imports
import 'assets/style/pages/Search.css'

// Static asset imports
import sample from "data/data.json"
import { handleNumericChangeForInequalities, handleNumericChangeForQueryParam } from 'utils/formHandlers'
import { getSingleRegexMatchString, getStringAmongStringsRegExp, getStringNotAmongStringsRegExp } from 'utils/regex'
import { axios, getURL } from 'utils/modules/axios/ygoOpenAPI.axios'

// Enum/Interface/Type imports
import { Root } from 'types/ygopro.types'
import { REGEX } from "types/regex.enum"

// Context imports
import useAppStore from "context/AppStore/store"
import useListerStore from 'context/ListerStore/store'

// TODO to replace with useEffect?
const cardTypes = ['Monster', 'Spell Card', 'Trap Card']
const monsterTypes = ['Ritual', 'Fusion', 'Synchro', 'Link', 'XYZ', 'Toon', 'Spirit', 'Gemini', 'Union'] // TODO add flip
const monsterAttributes = ['Earth', 'Wind', 'Fire', 'Water', 'Light', 'Dark', 'Divine']
const monsterRaces = ['Aqua', 'Beast', 'Beast-Warrior', 'Cyberse', 'Dinosaur', 'Divine-Beast', 'Dragon', 'Fairy', 'Fiend', 'Fish', 'Insect', 'Illusion', 'Machine', 'Plant', 'Psychic', 'Pyro', 'Reptile', 'Rock', 'Sea Serpent', 'Spellcaster', 'Thunder', 'Warrior', 'Winged Beast', 'Wyrm', 'Zombie']
const spellRaces = ['Normal', 'Field', 'Equip', 'Continuous', 'Quick-Play', 'Ritual']
const trapRaces = ['Normal', 'Continuous', 'Counter']
const monsterCardTypes = [
    "Effect Monster", "Flip Effect Monster", "Flip Tuner Effect Monster", "Gemini Monster", "Normal Monster", "Normal Tuner Monster", "Pendulum Effect Monster", "Pendulum Effect Ritual Monster", "Pendulum Flip Effect Monster", "Pendulum Normal Monster", "Pendulum Tuner Effect Monster", "Ritual Effect Monster", "Ritual Monster", "Spirit Monster", "Toon Monster", "Tuner Monster", "Union Effect Monster", "Fusion Monster", "Link Monster", "Pendulum Effect Fusion Monster", "Synchro Monster", "Synchro Pendulum Effect Monster", "Synchro Tuner Monster", "XYZ Monster", "XYZ Pendulum Effect Monster"
]

const Search =  () => {
    // Generic filters
    const [name, setName] = useState('')
    // const [desc, setDesc] = useState('')
    const [race, setRace] = useState('') // Monster type (aqua, ...) OR S/T Type

    // Monster-specific filters that don't need URL formatting
    const [attribute, setAttribute] = useState('')
    const [level, setLevel] = useState('')
    const [pendulumScale, setPendulumScale] = useState('')
    const [type, setType] = useState('') // TODO handle cleanup of other properties when changed
    const [atk, setAtk] = useState('')
    const [def, setDef] = useState('')
    
    // Monster type-specific filter (Regex part)
    const [monsterType, setMonsterType] = useState('')
    const [hasEffect, setHasEffect] = useState('')
    const [isPendulum, setPendulum] = useState('')
    const [isTuner, setTuner] = useState('')

    const setLoadingState = useAppStore((state) => state.setLoadingState)

    const setNextPageToLoad = useListerStore((state) => state.setNextPageToLoad)
    const setHasMoreItemsToLoad = useListerStore((state) => state.setHasMoreItemsToLoad)
    const setListerItems = useListerStore((state) => state.setListerItems)
    
    const request = async () => {
        setLoadingState(true)
        try{
            let response: Root = (await axios.get(queryBuilder(1))).data
            //let response: Root = sample;
            if(response.meta.pages_remaining !== 0){
                setHasMoreItemsToLoad(true)
                setNextPageToLoad(response.meta.next_page || '')
            }
            else {
                setHasMoreItemsToLoad(false)
            }
            setListerItems(response.data)
            setLoadingState(false)
        }
        catch (err) {
            console.error(err)
            alert(`I-i'm sorry, something just gone wrong =(.\n Change the parameters and try again`)
            setLoadingState(false)
        }
    }    
    
    /**
     * Convert the filters from the form to valid query parameters to use in the API call
     * @param page Number of the page to load
     * @returns {string} URL that includes selected filters
     */
    const queryBuilder = (page: number) => {
        // Prepare multiuple values for types
        var reg = new RegExp(`^${monsterType}${hasEffect}${isPendulum}${isTuner}${type}`)
        var types = monsterCardTypes.filter((cardType) => reg.test(cardType.toLowerCase()))
        var generalType = cardTypes.filter((cardType) => new RegExp(type).test(cardType.toLowerCase()))

        //Build query parameters
        var queryParams = `${name}${race}${getAtkDefAsQueryParam(atk, "&attack")}${getAtkDefAsQueryParam(def, "&defense")}${!type ? "" : (types.length > 0 ?`&card_type=${types.join(',')}`: `&card_type=${generalType}`)}${level}${attribute}`
        // TODO : Alert si pas de filtre pour tous ceux choisi
        return getURL(queryParams, page)
    }

    function getAtkDefAsQueryParam (state: string, prefix: string) {
        if (state) return `${prefix}${symbolMap.get(state[0])}${getSingleRegexMatchString(REGEX.NUMBER, state)}`
        else return ""
    }

    //*************GENERIC SELECTORS******************

    // Overall type of card : Monster spell or trap
    const typeSelector = <Select
        className='row'
        label='Card type'
        name='type'
        options={cardTypes}
        onChange={({target: {value}}) => setType(value.toLowerCase() === 'unset'?'':`(?=.*${value.toLowerCase()})`)}
    />
    
    /**
     * Generic Race selector (sub type : monster type (aqua, machine, ...) or spell/trap type (normal, continuous))
     * @param options collection of options (select)
     * @param label Label displayed in the form
     * @returns {JSX.Element} Customized select component
     */
    const cardSubTypeSelector = (options: string[], label: string) => <Select
        className='row'
        label={label}
        name='card-subtype'
        options={options}
        onChange={({target: {value}}) => setRace(value.toLowerCase() === 'unset'?'':`&race=${value}`)}
    />

    // Race for each type of card
    const monsterTypeSelector = cardSubTypeSelector(monsterRaces, "Monster Type")
    const spellTypeSelector = cardSubTypeSelector(spellRaces, "Spell Type")
    const trapTypeSelector = cardSubTypeSelector(trapRaces, "Trap Type")
    
    //*************MONSTER SPECIFIC SELECTORS******************
    // TODO use enum for values
    // Effect or Normal monster
    const effectSelector = <ToggleSwitch 
        className='row'
        label='Monster effect'
        name='state-e'
        radioInputs={
            [
                {
                    id: "normal",
                    name: "state-e",
                    displayName: "Normal",
                    checked: Boolean(hasEffect === getStringAmongStringsRegExp("normal")),
                    onClick: () => setHasEffect(getStringAmongStringsRegExp("normal"))
                },
                {
                    id: "na-effect",
                    name: "state-e",
                    displayName: "N/A",
                    checked: Boolean(hasEffect === ""),
                    onClick: () => setHasEffect("")
                },
                {
                    id: "effect",
                    name: "state-e",
                    displayName: "Effect",
                    checked: Boolean(hasEffect === getStringAmongStringsRegExp("effect")),
                    onClick: () => setHasEffect(getStringAmongStringsRegExp("effect"))
                }
            ]
        }
    />

    // Monster attribute
    const attributeSelector = <Select
        className='row'
        label='Attribute'
        name='monster-attribute'
        options={monsterAttributes}
        onChange={({target: {value}}) => setAttribute(value.toLowerCase() === 'unset'?'':`&attribute=${value}`)}
    />

    // Type of monster card : Ritual, Fusion, ...
    const monsterCardTypeSelector = <Select
        className='row'
        label='Type of Monster Card'
        name='monster-card-type'
        options={monsterTypes}
        onChange={({target: {value}}) => setMonsterType(value.toLowerCase() === 'unset'?'':`(/^(?!.*${value.toLowerCase()})/)`)}
    />

    // (Non-) Pendulum monster
    const isPendulumSelector = <ToggleSwitch 
        className='row'
        label='Pendulum'
        name='state-p'
        radioInputs={
            [
                {
                    id: "non-pendulum",
                    name: "state-p",
                    displayName: "No",
                    checked: Boolean(isPendulum === getStringNotAmongStringsRegExp("pendulum")),
                    onClick: () => setPendulum(getStringNotAmongStringsRegExp("pendulum"))
                },
                {
                    id: "na-pendulum",
                    name: "state-p",
                    displayName: "N/A",
                    checked: Boolean(isPendulum === ""),
                    onClick: () => setPendulum("")
                },
                {
                    id: "pendulum",
                    name: "state-p",
                    displayName: "Yes",
                    checked: Boolean(isPendulum === getStringAmongStringsRegExp("pendulum")),
                    onClick: () => setPendulum(getStringAmongStringsRegExp("pendulum"))
                }
            ]
        }
    />

    // (Non-) Tuner monster
    const isTunerSelector = <ToggleSwitch 
        className='row'
        label='Tuner'
        name='state-t'
        radioInputs={
            [
                {
                    id: "non-tuner",
                    name: "state-t",
                    displayName: "No",
                    checked: Boolean(isTuner === getStringNotAmongStringsRegExp("tuner")),
                    onClick: () => setTuner(getStringNotAmongStringsRegExp("tuner"))
                },
                {
                    id: "na-tuner",
                    name: "state-t",
                    displayName: "N/A",
                    checked: Boolean(isTuner === ""),
                    onClick: () => setTuner("")
                },
                {
                    id: "tuner",
                    name: "state-t",
                    displayName: "Yes",
                    checked: Boolean(isTuner === getStringAmongStringsRegExp("tuner")),
                    onClick: () => setTuner(getStringAmongStringsRegExp("tuner"))
                }
            ]
        }
    />

    // Monster level/rank
    const levelSelector = <NumberInput
        className='row'
        label='Level / Rank'
        name='monster-level'
        value={getSingleRegexMatchString(REGEX.NUMBER, level)}
        onChange={({target: {value}}) => handleNumericChangeForQueryParam(value,13,setLevel,"level")}
    />
        
    // Monster pendulum scale
    const pendulumSelector = <NumberInput
        className='row'
        label='Pendulum Scale'
        name='pendulum-scale'
        value={getSingleRegexMatchString(REGEX.NUMBER, pendulumScale)}
        onChange={({target: {value}}) => handleNumericChangeForQueryParam(value,13,setPendulumScale,"scale")}
    />

    // List of symbol for ATK/DEF search
    const symbolMap = new Map()
    symbolMap.set("=", '=')
    symbolMap.set("=lt", "<")
    symbolMap.set("=gt",">")
    //symbolMap.set("<", "_margin_top=")
    //symbolMap.set(">", "_margin_bottom=")

    /**
     * Extract the mathematic indicator from the query parameter and transform it to its matching symbol (ie "lt" becomes "<")
     * @param state Query parameter - <1800 | =700
     * @returns Mathematic symbol matching the query parameter
     */
    const getSymbol = (state: string) => {
        /*let sub;
        if (!state) sub = "="; // '=' is default
        else sub = state[0] //getSingleRegexMatchString(`${prefix}`, state); // Extract the indicator (=, =lt or =gt)
        return sub //symbolMap.get(sub); // Return the associated symbol */
        return state ? state[0] : "=" // '=' is default
    }

    /**
     * Update the state with a new mathematic indicator without changing the value
     * @param state Original state
     * @param setter Function to update the state
     */
    const changeSymbol = (state: string, setter: (val: string) => void) =>  {
        if (state) {
            let sub = getSymbol(state) // getSingleRegexMatchString(REGEX.MATH_SYMBOL, state); // Extract the "=..."
            let nextIndex = (Array.from(symbolMap.keys()).indexOf(sub) + 1) % symbolMap.size; // Get the index in symbolMap
            setter(`${Array.from(symbolMap.keys())[nextIndex]}${getSingleRegexMatchString(REGEX.NUMBER, state)}`); // Change the state depending on new symbol
        }
    }
    
    // Monster ATK Number input
    const atkSelector = <NumberInputWithButton
        className='row'
        label='ATK'
        name='atk'
        value={getSingleRegexMatchString(REGEX.NUMBER, atk)}
        onChange={({target: {value}}) => handleNumericChangeForInequalities(value,9999,setAtk, getSymbol(atk))}
        isButtonDisabled={!Boolean(atk)}
        onClick={() => changeSymbol(atk,setAtk)}
        displayName={getSymbol(atk)}
    />

    // Monster DEF Number input
    const defSelector = <NumberInputWithButton
        className='row'
        label='DEF'
        name='def'
        value={getSingleRegexMatchString(REGEX.NUMBER, def)}
        onChange={({target: {value}}) => handleNumericChangeForInequalities(value,9999,setDef, getSymbol(def))}
        isButtonDisabled={!Boolean(def)}
        onClick={() => changeSymbol(def,setDef)}
        displayName={getSymbol(def)}
    />

    return (
        <div className='search'>
            <div>
                <h3>Search</h3>
            </div>
            <div className='row'>
                <input className='full-text-input' name='card-name' type="text" placeholder="Type card name or description"
                    onChange={({target: {value}}) => setName(`&search=${value}`)}
                />
            </div>
            {typeSelector}

            {type.includes("monster")?
                <>
                    {monsterCardTypeSelector}
                    {monsterTypeSelector}
                    {levelSelector}
                    {atkSelector}
                    {defSelector}
                    {attributeSelector}
                    {effectSelector}
                    {isTunerSelector}
                    {isPendulumSelector}
                    {/*isPendulum === "(?=.*pendulum)" ?
                        pendulumSelector
                        :
                        <></>
                    */}
                </>
                :
                <></>
            }
            {type.includes("spell")?
                <>
                    {spellTypeSelector}
                </>
                :
                <></>
            }
            {type.includes("trap")?
                <>
                    {trapTypeSelector}
                </>
                :
                <></>
            }
            <Button className="search-button" onClick={() => {request()}} label="Search"/>
        </div>
    )
}

export default Search