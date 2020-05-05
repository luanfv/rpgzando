import React from 'react'
import {FlatList, Share} from 'react-native'
import {Background, Container, ContainerInfo, TextStyled, Title, Column2, Button} from './../styled'
import {calcModifier, expertise} from './../helpers/rules'

export default ({route, navigation}) =>
{
    const color = `rgba(255, 255, 255, .4)`
    const person = route.params.person
    const onShare = async () => {
        try 
        {
          await Share.share({
            message: `
                Minha ficha criada criada no RPGZando!
                \n\n
                PERSONAGEM:
                \n
                Nome: ${person.name}
                \n
                Nível: ${person.level}
                \n
                Raça: ${person.race}
                \n
                Classe: ${person.class}
                \n
                HP Total: ${person.fullHp}
                \n\n
                ATRIBUTOS:
                \n
                Força: ${`${person.attributes.for} (${calcModifier(person.attributes.for)})`}
                \n
                Constituição: ${`${person.attributes.con} (${calcModifier(person.attributes.con)})`}
                \n
                Destrza: ${`${person.attributes.des} (${calcModifier(person.attributes.des)})`}
                \n
                Inteligência: ${`${person.attributes.int} (${calcModifier(person.attributes.int)})`}
                \n
                Sabedoria: ${`${person.attributes.sab} (${calcModifier(person.attributes.sab)})`}
                \n
                Carisma: ${`${person.attributes.car} (${calcModifier(person.attributes.car)})`}
            `
          })
        }
        catch(e)
        {

        }
    }

    const Expertises = (props) =>
    {
        const value = props.data.item
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

        const handleExpertise = id =>
        {
            let value = 0
            person.expertise.forEach(e => {
                if(id === e)
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
            })

            return value
        }

        return (
            <Column2 marginBottom="10">
                <TextStyled color={color} fontsize="22">{value.desc}:</TextStyled>
                <TextStyled fontsize="22">{parseInt(calcModifier(handleAttr(value.type))) + handleExpertise(value.id)}</TextStyled>
            </Column2>
        )
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
                    <TextStyled fontsize="22">{person.level}</TextStyled>
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
                    <TextStyled fontsize="22">{person.fullHp}</TextStyled>
                </ContainerInfo>
            </Container>

            <Container>
                <Title>atributos:</Title>

                <Column2>
                    <ContainerInfo   ContainerInfo width="48">
                        <TextStyled color={color} fontsize="14">FORÇA:</TextStyled>
                        <TextStyled fontsize="22">{person.attributes.for} ({calcModifier(person.attributes.for)})</TextStyled>
                    </ContainerInfo>

                    <ContainerInfo width="48">
                        <TextStyled color={color} fontsize="14">CONSTITUIÇÃO:</TextStyled>
                        <TextStyled fontsize="22">{person.attributes.con} ({calcModifier(person.attributes.con)})</TextStyled>
                    </ContainerInfo>

                    <ContainerInfo width="48">
                        <TextStyled color={color} fontsize="14">DESTRZA:</TextStyled>
                        <TextStyled fontsize="22">{person.attributes.des} ({calcModifier(person.attributes.des)})</TextStyled>
                    </ContainerInfo>

                    <ContainerInfo width="48">
                        <TextStyled color={color} fontsize="14">INTELIGENCIA:</TextStyled>
                        <TextStyled fontsize="22">{person.attributes.int} ({calcModifier(person.attributes.int)})</TextStyled>
                    </ContainerInfo>

                    <ContainerInfo width="48">
                        <TextStyled color={color} fontsize="14">SABEDORIA:</TextStyled>
                        <TextStyled fontsize="22">{person.attributes.sab} ({calcModifier(person.attributes.sab)})</TextStyled>
                    </ContainerInfo>

                    <ContainerInfo width="48">
                        <TextStyled color={color} fontsize="14">CARISMA:</TextStyled>
                        <TextStyled fontsize="22">{person.attributes.car} ({calcModifier(person.attributes.car)})</TextStyled>
                    </ContainerInfo>
                </Column2>
            </Container>

            <Container>
                <Title>Perícias:</Title>
                <FlatList
                    data={expertise}
                    keyExtractor={expertise.id}
                    renderItem={e => <Expertises data={e} attributes={person.attributes} />}
                />
            </Container>

            <Button onPress={onShare}>
                <TextStyled bold={true}>COMPARTILHAR</TextStyled>
            </Button>

            <Button onPress={() => navigation.navigate('Criando Personagem')}>
                <TextStyled bold={true}>CRIAR OUTRA FICHA</TextStyled>
            </Button>
        </Background>
    )
}