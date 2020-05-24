import React, {useEffect, useState} from 'react'
import {View} from 'react-native'
import {Background, Header, HeaderLogo, HeaderTxt, Main, Content, Card, Class, Txt} from './styled'
import {races} from './../../helpers/rules'
import Logo from './../../images/icon.png'
import {Button, TextStyled} from './../../themes/styled'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'
import AsyncStorage from '@react-native-community/async-storage'


export default ({route, navigation}) =>
{
    const [cards, setCards] = useState([])

    const handleImg = (id) =>
    {
        let img = false

        races.forEach(race => {
            if(race.id === id)
            {
                img = race.image
                return
            }
        })

        return img
    }

    useEffect(() => {
        const handleCards = async () =>
        {
            const response = JSON.parse(await AsyncStorage.getItem('@Cards'))

            if(response === null)
                return true

            setCards(response)
            return false
        }

        handleCards()
    }, [route])

    return (
        <Background>
            <Header>
                <HeaderLogo source={Logo} />
                <HeaderTxt>
                    RPGZando
                </HeaderTxt>

                {
                    cards.length < 3
                    &&
                    <Button top={20} onPress={() => navigation.navigate('Nova Ficha')}>
                        <TextStyled bold>NOVA FICHA{'   '}</TextStyled>
                        <FontAwesome5 name="dice-d20" size={24} color="#fff" />
                    </Button>
                }
            </Header>
            <Main>
                <Content>
                    <Txt color="rgba(255,255,255,0.5)">Fichas: {cards.length}/3</Txt>
                    {
                        cards.map((person, key) => {
                            return (
                                <Card key={key} onPress={() => navigation.navigate('Ficha', {person: person, cardId: key})}>
                                    <Class source={handleImg(person.raceId)}/>
                                    <View>
                                        <Txt fontsize={20}>
                                            {person.name}, {person.class}
                                        </Txt>
                                        <Txt color="rgba(255,255,255,0.5)">
                                            NÍVEL: {person.level}
                                        </Txt>
                                    </View>
                                </Card>
                            )
                        })
                    }
                </Content>
            </Main>
        </Background>
    )
}