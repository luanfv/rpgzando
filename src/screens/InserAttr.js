import React, {useState} from 'react'
import {Background, Container, Title, TextStyled, Attribute, Input, Button} from './../themes/styled'
import Slider from '@react-native-community/slider'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'
import {warning} from './../helpers/rules'

export default ({route, navigation}) => 
{
    const person = route.params.person
    const [hp, setHp] = useState(0)
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

    const randomHp = () =>
    {
        let newHp = 0
        for(let i = 0; i < person.level; i++)
            newHp += Math.floor(Math.random() * person.hp) + 1

        setHp(newHp)
    }

    const handlePerson = () => 
    {
        if(hp < person.level || hp > (person.level * person.hp))
        {
            warning(`Valor do hp inválido`)
            return
        }

        if(
            attributes.for === 0 ||
            attributes.des === 0 ||
            attributes.con === 0 ||
            attributes.int === 0 ||
            attributes.sab === 0 ||
            attributes.car === 0
        )
        {
            warning(`Atributos não podem ter o valor de zero (0)`)
            return
        }

        const personCreated = {
            ...person,
            fullHp: hp,
            attributes: {
                for: Math.trunc((person.attributes.for + attributes.for)),
                con: Math.trunc((person.attributes.con + attributes.con)),
                des: Math.trunc((person.attributes.des + attributes.des)),
                int: Math.trunc((person.attributes.int + attributes.int)),
                sab: Math.trunc((person.attributes.sab + attributes.sab)),
                car: Math.trunc((person.attributes.car + attributes.car)),
            }
        }

        navigation.navigate('Ficha', {person: personCreated})
    }
    
    return (
        <Background>
            <Container>
                <Title>Defina seu HP</Title>
                <Button background="#D8D8D8" onPress={() => randomHp()}>
                    <TextStyled color='#4ead63' bold={true}>
                        <FontAwesome5 name="dice" size={18} color="#4ead63" />{`  `}ALEATORIO
                    </TextStyled>
                </Button>
                <TextStyled>HP TOTAL ({person.level} x 1d{person.hp})</TextStyled>
                <Input 
                    keyboardType='numeric'
                    value={''+hp}
                    onChangeText={e => setHp(e === '' ? 0 : e > person.level * person.hp ? person.level * person.hp : parseInt(e))}
                />
            </Container>
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
                    <Input 
                        keyboardType='numeric'
                        value={''+Math.trunc(attributes.for)}
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
                    <Input 
                        keyboardType='numeric'
                        value={''+Math.trunc(attributes.des)}
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
                    <Input 
                        keyboardType='numeric'
                        value={''+Math.trunc(attributes.con)}
                        onChangeText={e => setAttributes({...attributes, con: e === '' ? 0 : e > 20 ? 20 : parseInt(e)})}
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
                    <Input 
                        keyboardType='numeric'
                        value={''+Math.trunc(attributes.int)}
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
                    <Input 
                        keyboardType='numeric'
                        value={''+Math.trunc(attributes.sab)}
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
                    <Input 
                        keyboardType='numeric'
                        value={''+Math.trunc(attributes.car)}
                        onChangeText={e => setAttributes({...attributes, car: e === '' ? 0 : e > 20 ? 20 : parseInt(e)})}
                    />
                </Attribute>
            </Container>

            <Button onPress={() => handlePerson()}>
                <TextStyled bold={true}>FINALIZAR</TextStyled>
            </Button>
        </Background>
    )
}