import React, {useState} from 'react'
import {View, Text, Button, Image} from 'react-native'
import {handleRace, races, classes} from './helpers/rules'
import {Picker} from '@react-native-community/picker'

export default () => 
{
    const [raceId, setRaceId] = useState(races[0].id)
    const [race, setRace] = useState(races[0])
    const [PersonClassId, setPersonClassId] = useState(classes[0].id)
    const [personClass, setPersonClass] = useState(classes[0])
    
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

    const handleClassSelected = key =>
    {
        classes.map(e => {
            if(e.id === key)
            {
                setPersonClassId(e.id)
                setPersonClass(e)

                return
            }
        })
    }
    
    return (
        <View>
            <Text>Selecione sua raça</Text>
            <Image source={race.image} />
            <Picker
                selectedValue={raceId}
                onValueChange={value => handleRaceSelected(value)}
            >
                {races.map(value => <Picker.Item key={value.id} value={value.id} label={value.name} />)}
            </Picker>

            <View key={race.id}>
                <Text>Raça: {race.name}</Text>
                <Text>Atributos: {race.desc}</Text>
            </View>


            <Text>Selecione sua classe</Text>
            <Image source={personClass.image} />
            <Picker
                selectedValue={PersonClassId}
                onValueChange={value => handleClassSelected(value)}
            >
                {classes.map(value => <Picker.Item key={value.id} value={value.id} label={value.name} />)}
            </Picker>

            <View key={personClass.id}>
                <Text>Classe: {personClass.name}</Text>
                <Text>HP: {personClass.hp}</Text>
            </View>

            <Button onPress={() => console.log(handleRace(race.race, race.subRace))} title="Confirmar" />
        </View>
    )
}