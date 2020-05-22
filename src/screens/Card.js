import React from 'react'
import {Share, View} from 'react-native'
import {Background, Container, ContainerInfo, TextStyled, Title, Column2, Button} from './../styled'
import {calcModifier, warning} from './../helpers/rules'
import AsyncStorage from '@react-native-community/async-storage'

export default ({route, navigation}) =>
{
    const color = `rgba(255, 255, 255, .4)`
    const person = route.params.person

    const onShare = async () => 
    {
        try 
        {
          await Share.share({
            message: `Minha ficha criada no RPGZando!\n\nPERSONAGEM:\nNome: ${person.name}\nNível: ${person.level}\nRaça: ${person.race}\nClasse: ${person.class}\nHP Total: ${person.fullHp}\n\nATRIBUTOS:\nForça: ${`${person.attributes.for} (${calcModifier(person.attributes.for)})`}\nConstituição: ${`${person.attributes.con} (${calcModifier(person.attributes.con)})`}\nDestreza: ${`${person.attributes.des} (${calcModifier(person.attributes.des)})`}\nInteligência: ${`${person.attributes.int} (${calcModifier(person.attributes.int)})`}\nSabedoria: ${`${person.attributes.sab} (${calcModifier(person.attributes.sab)})`}\nCarisma: ${`${person.attributes.car} (${calcModifier(person.attributes.car)})`}\n\nPERÍCIAS:\nAtletismo: ${parseInt(calcModifier(person.attributes.for)) + handleExpertise(1)}\nAcrobacia: ${parseInt(calcModifier(person.attributes.des)) + handleExpertise(2)}\nFurtividade: ${parseInt(calcModifier(person.attributes.des)) + handleExpertise(3)}\nPrestidigitação:  ${parseInt(calcModifier(person.attributes.des)) + handleExpertise(4)}\nArcanismo:  ${parseInt(calcModifier(person.attributes.int)) + handleExpertise(5)}\nHistoria:  ${parseInt(calcModifier(person.attributes.int)) + handleExpertise(6)}\nInvestigação:  ${parseInt(calcModifier(person.attributes.int)) + handleExpertise(7)}\nNatureza:  ${parseInt(calcModifier(person.attributes.int)) + handleExpertise(8)}\nReligião:  ${parseInt(calcModifier(person.attributes.int)) + handleExpertise(9)}\nAdestrar Animais:  ${parseInt(calcModifier(person.attributes.sab)) + handleExpertise(10)}\nIntuição:  ${parseInt(calcModifier(person.attributes.sab)) + handleExpertise(11)}\nMedicina: ${parseInt(calcModifier(person.attributes.sab)) + handleExpertise(12)}\nPercepção: ${parseInt(calcModifier(person.attributes.sab)) + handleExpertise(13)}\nSobrevivência: ${parseInt(calcModifier(person.attributes.sab)) + handleExpertise(14)}\nAtuação: ${parseInt(calcModifier(person.attributes.car)) + handleExpertise(15)}\nEnganação: ${parseInt(calcModifier(person.attributes.car)) + handleExpertise(16)}\nIntimidação: ${parseInt(calcModifier(person.attributes.car)) + handleExpertise(17)}\nPersuasão: ${parseInt(calcModifier(person.attributes.car)) + handleExpertise(18)}`
          })
        }
        catch(e)
        {
            warning('Ocorreu um erro, não foi compartilhar sua ficha!')
        }
    }

    const saveCard = async () =>
    {
        let cards = []

        try 
        {
            const response = JSON.parse(await AsyncStorage.getItem('@Cards'))

            if(response !== null)
                cards = response

            cards.push(person)
            await AsyncStorage.setItem('@Cards', JSON.stringify(cards))
            navigation.navigate('Home', {update: true})
        } 
        catch(err)
        {
            warning('Ocorreu um erro, não foi possivel salvar sua ficha!')
        }
    }

    const handleExpertise = id =>
    {
        let value = 0
        person.expertise.forEach(e => {
            if(id === e) {
                if(person.level < 5)
                    value = 2
                else if(person.level < 9)
                    value = 3
                else if(person.level < 13)
                    value = 4
                else if(person.level < 17)
                    value = 5
                else
                    value = 6
            }
        })

        return value
    }

    const handleAttr = value =>
    {
        if(value === 1)
            return person.attributes.for
        else if(value === 2)
            return person.attributes.des
        else if(value === 3)
            return person.attributes.con
        else if(value === 4)
            return person.attributes.int
        else if(value === 5)
            return person.attributes.sab
        else if(value === 6)
            return person.attributes.car
    }

    return (
        <Background>
            <Container>
                <Title>personagem:</Title>
                <ContainerInfo>
                    <TextStyled color={color} fontsize="14">Nome:</TextStyled>
                    <TextStyled fontsize="22">{person.name}</TextStyled>
                </ContainerInfo>
                
                <ContainerInfo>
                    <TextStyled color={color} fontsize="14">Nível:</TextStyled>
                    <TextStyled fontsize="22">{`${person.level} `}</TextStyled>
                </ContainerInfo>

                <ContainerInfo>
                    <TextStyled color={color} fontsize="14">Raça:</TextStyled>
                    <TextStyled fontsize="22">{person.race}</TextStyled>
                </ContainerInfo>

                <ContainerInfo>
                    <TextStyled color={color} fontsize="14">Classe:</TextStyled>
                    <TextStyled fontsize="22">{person.class}</TextStyled>
                </ContainerInfo>

                <ContainerInfo>
                    <TextStyled color={color} fontsize="14">HP:</TextStyled>
                    <TextStyled fontsize="22">
                        {
                            parseInt(calcModifier(person.attributes.for)) > 0 
                            ?
                            person.fullHp + (person.level * parseInt(calcModifier(person.attributes.con)))
                            :
                            person.fullHp
                        }
                    </TextStyled>
                </ContainerInfo>
            </Container>

            <Container>
                <Title>atributos:</Title>

                <Column2>
                    <ContainerInfo   ContainerInfo width="48">
                        <TextStyled color={color} fontsize="14">FORÇA:</TextStyled>
                        <TextStyled fontsize="22">{`${person.attributes.for} `} ({calcModifier(person.attributes.for)})</TextStyled>
                    </ContainerInfo>

                    <ContainerInfo width="48">
                        <TextStyled color={color} fontsize="14">CONSTITUIÇÃO:</TextStyled>
                        <TextStyled fontsize="22">{`${person.attributes.con} `} ({calcModifier(person.attributes.con)})</TextStyled>
                    </ContainerInfo>

                    <ContainerInfo width="48">
                        <TextStyled color={color} fontsize="14">DESTRZA:</TextStyled>
                        <TextStyled fontsize="22">{`${person.attributes.des} `} ({calcModifier(person.attributes.des)})</TextStyled>
                    </ContainerInfo>

                    <ContainerInfo width="48">
                        <TextStyled color={color} fontsize="14">INTELIGENCIA:</TextStyled>
                        <TextStyled fontsize="22">{`${person.attributes.int} `} ({calcModifier(person.attributes.int)})</TextStyled>
                    </ContainerInfo>

                    <ContainerInfo width="48">
                        <TextStyled color={color} fontsize="14">SABEDORIA:</TextStyled>
                        <TextStyled fontsize="22">{`${person.attributes.sab} `} ({calcModifier(person.attributes.sab)})</TextStyled>
                    </ContainerInfo>

                    <ContainerInfo width="48">
                        <TextStyled color={color} fontsize="14">CARISMA:</TextStyled>
                        <TextStyled fontsize="22">{`${person.attributes.car} `} ({calcModifier(person.attributes.car)})</TextStyled>
                    </ContainerInfo>
                </Column2>
            </Container>

            <Container>
                <Title>Perícias:</Title>
                <View>
                    <Column2 marginBottom="10">
                        <TextStyled color={color} fontsize="22">Atletismo:</TextStyled>
                        <TextStyled fontsize="22">{`${parseInt(calcModifier(person.attributes.for)) + handleExpertise(1)} `}</TextStyled>
                    </Column2>
                    <Column2 marginBottom="10">
                        <TextStyled color={color} fontsize="22">Acrobacia:</TextStyled>
                        <TextStyled fontsize="22">{`${parseInt(calcModifier(person.attributes.des)) + handleExpertise(2)} `}</TextStyled>
                    </Column2>
                    <Column2 marginBottom="10">
                        <TextStyled color={color} fontsize="22">Furtividade:</TextStyled>
                        <TextStyled fontsize="22">{`${parseInt(calcModifier(person.attributes.des)) + handleExpertise(3)} `}</TextStyled>
                    </Column2>
                    <Column2 marginBottom="10">
                        <TextStyled color={color} fontsize="22">Prestidigitação:</TextStyled>
                        <TextStyled fontsize="22">{`${parseInt(calcModifier(person.attributes.des)) + handleExpertise(4)} `}</TextStyled>
                    </Column2>
                    <Column2 marginBottom="10">
                        <TextStyled color={color} fontsize="22">Arcanismo:</TextStyled>
                        <TextStyled fontsize="22">{`${parseInt(calcModifier(person.attributes.int)) + handleExpertise(5)} `}</TextStyled>
                    </Column2>
                    <Column2 marginBottom="10">
                        <TextStyled color={color} fontsize="22">Historia:</TextStyled>
                        <TextStyled fontsize="22">{`${parseInt(calcModifier(person.attributes.int)) + handleExpertise(6)} `}</TextStyled>
                    </Column2>
                    <Column2 marginBottom="10">
                        <TextStyled color={color} fontsize="22">Investigação:</TextStyled>
                        <TextStyled fontsize="22">{`${parseInt(calcModifier(person.attributes.int)) + handleExpertise(7)} `}</TextStyled>
                    </Column2>
                    <Column2 marginBottom="10">
                        <TextStyled color={color} fontsize="22">Natureza:</TextStyled>
                        <TextStyled fontsize="22">{`${parseInt(calcModifier(person.attributes.int)) + handleExpertise(8)} `}</TextStyled>
                    </Column2>
                    <Column2 marginBottom="10">
                        <TextStyled color={color} fontsize="22">Religião:</TextStyled>
                        <TextStyled fontsize="22">{`${parseInt(calcModifier(person.attributes.int)) + handleExpertise(9)} `}</TextStyled>
                    </Column2>
                    <Column2 marginBottom="10">
                        <TextStyled color={color} fontsize="22">Adestrar Animais:</TextStyled>
                        <TextStyled fontsize="22">{`${parseInt(calcModifier(person.attributes.sab)) + handleExpertise(10)} `}</TextStyled>
                    </Column2>
                    <Column2 marginBottom="10">
                        <TextStyled color={color} fontsize="22">Intuição:</TextStyled>
                        <TextStyled fontsize="22">{`${parseInt(calcModifier(person.attributes.sab)) + handleExpertise(11)} `}</TextStyled>
                    </Column2>
                    <Column2 marginBottom="10">
                        <TextStyled color={color} fontsize="22">Medicina:</TextStyled>
                        <TextStyled fontsize="22">{`${parseInt(calcModifier(person.attributes.sab)) + handleExpertise(12)} `}</TextStyled>
                    </Column2>
                    <Column2 marginBottom="10">
                        <TextStyled color={color} fontsize="22">Percepção:</TextStyled>
                        <TextStyled fontsize="22">{`${parseInt(calcModifier(person.attributes.sab)) + handleExpertise(13)} `}</TextStyled>
                    </Column2>
                    <Column2 marginBottom="10">
                        <TextStyled color={color} fontsize="22">Sobrevivência:</TextStyled>
                        <TextStyled fontsize="22">{`${parseInt(calcModifier(person.attributes.sab)) + handleExpertise(14)} `}</TextStyled>
                    </Column2>
                    <Column2 marginBottom="10">
                        <TextStyled color={color} fontsize="22">Atuação:</TextStyled>
                        <TextStyled fontsize="22">{`${parseInt(calcModifier(person.attributes.car)) + handleExpertise(15)} `}</TextStyled>
                    </Column2>
                    <Column2 marginBottom="10">
                        <TextStyled color={color} fontsize="22">Enganação:</TextStyled>
                        <TextStyled fontsize="22">{`${parseInt(calcModifier(person.attributes.car)) + handleExpertise(16)} `}</TextStyled>
                    </Column2>
                    <Column2 marginBottom="10">
                        <TextStyled color={color} fontsize="22">Intimidação:</TextStyled>
                        <TextStyled fontsize="22">{`${parseInt(calcModifier(person.attributes.car)) + handleExpertise(17)} `}</TextStyled>
                    </Column2>
                    <Column2 marginBottom="10">
                        <TextStyled color={color} fontsize="22">Persuasão:</TextStyled>
                        <TextStyled fontsize="22">{`${parseInt(calcModifier(person.attributes.car)) + handleExpertise(18)} `}</TextStyled>
                    </Column2>
                </View>
            </Container>

            <Button onPress={onShare}>
                <TextStyled bold={true}>COMPARTILHAR</TextStyled>
            </Button>

            <Button onPress={saveCard}>
                <TextStyled bold={true}>SALVAR</TextStyled>
            </Button>
        </Background>
    )
}