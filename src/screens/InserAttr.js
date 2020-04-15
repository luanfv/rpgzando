import React, {useState, useEffect} from 'react'
import {View, Text, Button, TextInput} from 'react-native'
import {Background, Container, Title, TextStyled, Attribute, AttributeInput} from './../styled'
import Slider from '@react-native-community/slider'

export default ({route, navigation}) => 
{
    const person = route.params.person
    const [attributes, setAttributes] = useState({
        for: 0,
        des: 0,
        con: 0,
        int: 0,
        sab: 0,
        car: 0,
    })

    useEffect(() => {}, [])
    
    return (
        <Background>
            <Container>
                <Title>Defina seus atributos</Title>
                <Attribute>
                    <TextStyled>FORÇA: <Title>+{person.attributes.for}</Title></TextStyled>
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
                    <TextStyled>DESTREZA: <Title>+{person.attributes.des}</Title></TextStyled>
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
                    <TextStyled>CONSTITUIÇÃO: <Title>+{person.attributes.con}</Title></TextStyled>
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
                    <TextStyled>INTELIGENCIA: <Title>+{person.attributes.int}</Title></TextStyled>
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
                    <TextStyled>SABEDORIA: <Title>+{person.attributes.sab}</Title></TextStyled>
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
                    <TextStyled>CARISMA: <Title>+{person.attributes.car}</Title></TextStyled>
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

            <Button color="#570a0a" title="Continuar" />
        </Background>
    )
}