import React, {useState, useEffect} from 'react'
import {Background, Container, Title, TextStyled, Attribute, AttributeInput, Button} from './../styled'
import Slider from '@react-native-community/slider'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'

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
    const randomAttr = () =>
    {
        setAttributes({...attributes, 
            for: Math.floor(Math.random() * 20) + 1, 
            des: Math.floor(Math.random() * 20) + 1, 
            con: Math.floor(Math.random() * 20) + 1, 
            int: Math.floor(Math.random() * 20) + 1,
            sab: Math.floor(Math.random() * 20) + 1,
            car: Math.floor(Math.random() * 20) + 1
        })
    }

    useEffect(() => {}, [])
    
    return (
        <Background>
            <Container>
                <Title>Defina seus atributos</Title>
                <Button background="#D8D8D8" onPress={() => randomAttr()}>
                    <TextStyled color='#4ead63' bold={true}>
                        <FontAwesome5 name="dice" size={18} color="#4ead63" />{`  `}ALEATORIO
                    </TextStyled>
                </Button>
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

            <Button>
                <TextStyled bold={true}>FINALIZAR</TextStyled>
            </Button>
        </Background>
    )
}