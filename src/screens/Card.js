import React from 'react'
import {FlatList} from 'react-native'
import {Background, Container, ContainerInfo, TextStyled, Title, Column2} from './../styled'
import {calcModifier, expertise} from './../helpers/rules'

export default ({route, navigation}) =>
{
    const color = `rgba(255, 255, 255, .4)`
    const person = route.params.person

    const Expertises = (props) =>
    {
        const value = props.data.item
        const handleAttr = (value, id) =>
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
            <Column2 marginBottom="10">
                <TextStyled color={color} fontsize="22">{value.desc}:</TextStyled>
                <TextStyled fontsize="22">{calcModifier(handleAttr(value.type, value.id))}</TextStyled>
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
        </Background>
    )
}