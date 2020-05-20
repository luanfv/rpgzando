import React from 'react'
import {View} from 'react-native'
import {Background, Header, HeaderLogo, HeaderTxt, Main, Content, Card, Class, Txt} from './styled'
import {races} from './../../helpers/rules'
import Logo from './../../images/icon.png'
import {Button, TextStyled} from './../../styled'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'


export default () =>
{
    const cards = [
        {id: 1, name: 'Robson', level: 2, class: 'Barbaro', race: 2},
        {id: 2, name: 'Cleydomares Jr.', level: 4, class: 'Guerreiro', race: 11},
    ]

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
                    <Button top={20}>
                        <TextStyled bold>NOVA FICHA{'   '}</TextStyled>
                        <FontAwesome5 name="dice-d20" size={24} color="#fff" />
                    </Button>
                }
            </Header>
            <Main>
                <Content>
                    <Txt color="rgba(255,255,255,0.5)">Fichas: {cards.length}/3</Txt>
                    {
                        cards.map(person => {
                            return (
                                <Card key={person.id}>
                                    <Class source={handleImg(person.race)}/>
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