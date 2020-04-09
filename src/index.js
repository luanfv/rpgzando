import React, {useState} from 'react'
import {View, Text, Button} from 'react-native'
import {handleRace} from './helpers/rules'
import {Picker} from '@react-native-community/picker'

export default () => 
{
    const races = [
        {
            id: 1, 
            name: 'hill dwarf', 
            race: 1, 
            subRace: 1, 
            desc: 'this race gives you +2 constitution for being a dwarf and + 1 wisdom for being from the hill'
        },
        {
            id: 2, 
            name: 'mountain dwarf', 
            race: 1, 
            subRace: 2, 
            desc: 'this race gives you +2 constitution for being a dwarf and +2 strength for being from the hill'
        },
    ]
    const [raceId, setRaceId] = useState(races[0].id)
    const [race, setRace] = useState({
        id: races[0].id, 
        name: races[0].name, 
        race: races[0].race, 
        subRace: races[0].subRace, 
        desc: races[0].desc
    })
    
    const handleRaceSelected = (key) =>
    {
        races.map(e => {
            if(e.id === key)
            {
                setRace(e)
                setRaceId(e.id)

                return
            }
        })
    }

    return (
        <View>
            <Text>Select your race</Text>
            <Picker
                selectedValue={raceId}
                onValueChange={value => handleRaceSelected(value)}
            >
                {races.map(value => <Picker.Item key={value.id} value={value.id} label={value.name} />)}
            </Picker>

            <View key={race.id}>
                <Text>{race.name}</Text>
                <Text>{race.desc}</Text>
            </View>

            <Button onPress={() => console.log(handleRace(race.race, race.subRace))} title="Confirm" />
        </View>
    )
}