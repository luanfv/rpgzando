import React, {useState, useEffect} from 'react'
import {View, Text, Button, TextInput} from 'react-native'
import {handleRace, races, classes} from './helpers/rules'
import {Background, Container, TextStyled, Title, Images, Select, FlexRow, Attribute, AttributeInput} from './styled'
import CheckBox from '@react-native-community/checkbox'
import Slider from '@react-native-community/slider'

export default () => 
{
    const [raceId, setRaceId] = useState(races[0].id)
    const [race, setRace] = useState(races[0])
    const [personClassId, setPersonClassId] = useState(classes[0].id)
    const [personClass, setPersonClass] = useState(classes[0])
    const [person, setPerson] = useState({
        name: '',
        race: raceId,
        class: personClassId,
        expertise: []
    })
    const [attributes, setAttributes] = useState({
        for: 0,
        des: 0,
        con: 0,
        int: 0,
        sab: 0,
        car: 0,
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

        if(length !== personClass.quantityExpertise)
        {
            alert(`Você tem que escolher ${personClass.quantityExpertise} perícias`)
            return
        }

        setPerson({...person, expertise: expertises, class: personClass.id, race: race.id})
    }

    useEffect(() => {
        console.log(person)
    }, [person])
    
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
                            <FlexRow key={e.id}>
                                <CheckBox value={e.checked} onChange={() => alterCheck(i)} />
                                <TextStyled>{e.desc}</TextStyled>
                            </FlexRow>
                        )
                    })
                }
            </Container>

            <Container>
                <Attribute>
                    <TextStyled>FORÇA:</TextStyled>
                    <Slider 
                        minimumValue={1}
                        maximumValue={20}
                        minimumTrackTintColor='#4ead63'
                        maximumTrackTintColor='#fff'
                        thumbTintColor='#4ead63'
                        onValueChange={e => setAttributes({...attributes, for: e})}
                        value={attributes.for}
                    />
                    <AttributeInput 
                        keyboardType='numeric'
                        value={''+attributes.for.toFixed(0)}
                        onChangeText={e => setAttributes({...attributes, for: e === '' ? 0 : e > 20 ? 20 : parseInt(e)})}
                    />
                </Attribute>
                <Attribute>
                    <TextStyled>DESTREZA:</TextStyled>
                    <Slider 
                        minimumValue={1}
                        maximumValue={20}
                        minimumTrackTintColor='#4ead63'
                        maximumTrackTintColor='#fff'
                        thumbTintColor='#4ead63'
                        onValueChange={e => setAttributes({...attributes, des: e})}
                        value={attributes.des}
                    />
                    <AttributeInput 
                        keyboardType='numeric'
                        value={''+attributes.des.toFixed(0)}
                        onChangeText={e => setAttributes({...attributes, des: e === '' ? 0 : e > 20 ? 20 : parseInt(e)})}
                    />
                </Attribute>
                <Attribute>
                    <TextStyled>CONSTITUIÇÃO:</TextStyled>
                    <Slider 
                        minimumValue={1}
                        maximumValue={20}
                        minimumTrackTintColor='#4ead63'
                        maximumTrackTintColor='#fff'
                        thumbTintColor='#4ead63'
                        onValueChange={e => setAttributes({...attributes, con: e})}
                        value={attributes.con}
                    />
                    <AttributeInput 
                        keyboardType='numeric'
                        value={''+attributes.con.toFixed(0)}
                        onChangeText={e => setAttributes({...attributes, cont: e === '' ? 0 : e > 20 ? 20 : parseInt(e)})}
                    />
                </Attribute>
                <Attribute>
                    <TextStyled>INTELIGENCIA:</TextStyled>
                    <Slider 
                        minimumValue={1}
                        maximumValue={20}
                        minimumTrackTintColor='#4ead63'
                        maximumTrackTintColor='#fff'
                        thumbTintColor='#4ead63'
                        onValueChange={e => setAttributes({...attributes, int: e})}
                        value={attributes.int}
                    />
                    <AttributeInput 
                        keyboardType='numeric'
                        value={''+attributes.int.toFixed(0)}
                        onChangeText={e => setAttributes({...attributes, int: e === '' ? 0 : e > 20 ? 20 : parseInt(e)})}
                    />
                </Attribute>
                <Attribute>
                    <TextStyled>SABEDORIA:</TextStyled>
                    <Slider 
                        minimumValue={1}
                        maximumValue={20}
                        minimumTrackTintColor='#4ead63'
                        maximumTrackTintColor='#fff'
                        thumbTintColor='#4ead63'
                        onValueChange={e => setAttributes({...attributes, sab: e})}
                        value={attributes.sab}
                    />
                    <AttributeInput 
                        keyboardType='numeric'
                        value={''+attributes.sab.toFixed(0)}
                        onChangeText={e => setAttributes({...attributes, sab: e === '' ? 0 : e > 20 ? 20 : parseInt(e)})}
                    />
                </Attribute>
                <Attribute>
                    <TextStyled>CARISMA:</TextStyled>
                    <Slider 
                        minimumValue={1}
                        maximumValue={20}
                        minimumTrackTintColor='#4ead63'
                        maximumTrackTintColor='#fff'
                        thumbTintColor='#4ead63'
                        onValueChange={e => setAttributes({...attributes, car: e})}
                        value={attributes.car}
                    />
                    <AttributeInput 
                        keyboardType='numeric'
                        value={''+attributes.car.toFixed(0)}
                        onChangeText={e => setAttributes({...attributes, car: e === '' ? 0 : e > 20 ? 20 : parseInt(e)})}
                    />
                </Attribute>
            </Container>

            <Button onPress={() => handlePerson()} color="#570a0a" title="Continuar" />
        </Background>
    )
}