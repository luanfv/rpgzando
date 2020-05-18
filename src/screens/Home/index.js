import React from 'react'
import {View, Text, FlatList} from 'react-native'
import {Background, Header, Main, Card, Class, Txt} from './styled'
import {races} from './../../helpers/rules'

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
            <Header />
            <Main>
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
            </Main>
        </Background>
    )
}