import React, {useState} from 'react'
import {View, Text, Button} from 'react-native'
import {handleRace, races, classes} from './helpers/rules'
import {Background, Container, TextStyled, Title, Images, Select} from './styled'

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
        <Background>
            <Container>
                <Title>Selecione sua raça</Title>
                <Images source={race.image} />
                <Select
                    selectedValue={raceId}
                    onValueChange={value => handleRaceSelected(value)}
                >
                    {races.map(value => <Select.Item key={value.id} value={value.id} label={value.name} />)}
                </Select>

                <View key={race.id}>
                    <TextStyled>Raça: {race.name}</TextStyled>
                    <TextStyled>Atributos: {race.desc}</TextStyled>
                </View>
            </Container>

            <Container>
                <Title>Selecione sua classe</Title>
                <Images source={personClass.image} />
                <Select
                    selectedValue={PersonClassId}
                    onValueChange={value => handleClassSelected(value)}
                >
                    {classes.map(value => <Select.Item key={value.id} value={value.id} label={value.name} />)}
                </Select>

                <View key={personClass.id}>
                    <TextStyled>Classe: {personClass.name}</TextStyled>
                    <TextStyled>HP: {personClass.hp}</TextStyled>
                </View>
            </Container>

            <Button onPress={() => console.log(handleRace(race.race, race.subRace))} color="#570a0a" title="Confirmar" />
        </Background>
    )
}