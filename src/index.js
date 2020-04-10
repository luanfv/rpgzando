import React, {useState} from 'react'
import {View, Text, Button} from 'react-native'
import {handleRace, races} from './helpers/rules'
import {Picker} from '@react-native-community/picker'

export default () => 
{
    const [raceId, setRaceId] = useState(races[0].id)
    const [race, setRace] = useState(races[0])
    
    const handleRaceSelected = key =>
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
            <Text>Selecione sua raça</Text>
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

            <Button onPress={() => console.log(handleRace(race.race, race.subRace))} title="Confirmar" />
        </View>
    )
}