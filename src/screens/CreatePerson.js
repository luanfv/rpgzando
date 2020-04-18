import React, {useState, useEffect} from 'react'
import {View, Alert} from 'react-native'
import {handleRace, races, classes} from './../helpers/rules'
import {Background, Container, TextStyled, Title, Images, Select, FlexRow, Button, Input} from './../styled'
import CheckBox from '@react-native-community/checkbox'

export default ({navigation}) => 
{
    const [raceId, setRaceId] = useState(races[0].id)
    const [race, setRace] = useState(races[0])
    const [personClassId, setPersonClassId] = useState(classes[0].id)
    const [personClass, setPersonClass] = useState(classes[0])
    const [person, setPerson] = useState({
        name: '',
        level: 1,
        race: raceId,
        subRace: race.subRace,
        class: personClassId,
        attributes: {},
        expertise: []
    })
    
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

    const alterCheck = position => 
    {
        let newExpertises = personClass.expertise
        newExpertises[position].checked = !newExpertises[position].checked

        setPersonClass({...personClass, expertise: newExpertises})
    }

    const handlePerson = () =>
    {
        let length = 0
        let expertises = []
        personClass.expertise.map(e => {
            if(e.checked)
            {
                expertises.push(e.id)
                length++
            }
        })

        if(person.name === '')
        {
            Alert.alert(`AVISO`,`Você precisa dar um nome ao seu personagem!`)
            return
        }

        if(length !== personClass.quantityExpertise)
        {
            Alert.alert(`AVISO`,`Você tem que escolher ${personClass.quantityExpertise} perícias`)
            return
        }

        const attrs = handleRace(race.race, race.subRace)
        if(attrs === null)
            return
        
        setPerson({
            ...person, 
            expertise: expertises, 
            class: personClass.id, 
            race: race.id, 
            attributes: attrs
        })
        
    }

    useEffect(() => {
        if(person.expertise.length > 0)
            navigation.navigate('Destribuindo os Atributos', {person: person})
    }, [person])
    
    return (
        <Background>
            <Container>
                <Title>personagem</Title>
                <TextStyled>Nome:</TextStyled>
                <Input 
                    value={person.name}
                    onChangeText={e => setPerson({...person, name: e})}
                    align="left" 
                    placeholder="Luan" 
                />
                <TextStyled>Nível:</TextStyled>
                <Input 
                    value={person.level ? `${person.level}` : `${1}`} 
                    onChangeText={e => setPerson({...person, level: e ? parseInt(e) : 1})}
                    keyboardType="numeric"
                    align="left" 
                    placeholder="2" 
                />
            </Container>
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
                    selectedValue={personClassId}
                    onValueChange={value => handleClassSelected(value)}
                >
                    {classes.map(value => <Select.Item key={value.id} value={value.id} label={value.name} />)}
                </Select>

                <View key={personClass.id}>
                    <TextStyled>Classe: {personClass.name}</TextStyled>
                    <TextStyled>HP: {personClass.hp}</TextStyled>
                </View>
            </Container>

            <Container>
                <Title>Escolha {personClass.quantityExpertise} Perícias:</Title>
                {
                    personClass.expertise && personClass.expertise.map((e, i) => {
                        return (
                            <FlexRow selected={e.checked} key={e.id}>
                                <TextStyled fontsize="20">{e.desc}</TextStyled>
                                <CheckBox value={e.checked} onChange={() => alterCheck(i)} />
                            </FlexRow>
                        )
                    })
                }
            </Container>

            <Button onPress={() => handlePerson()}>
                <TextStyled bold={true}>CONTINUAR</TextStyled>
            </Button>
        </Background>
    )
}