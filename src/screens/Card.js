import React from 'react'
import {Background, Container, ContainerInfo, TextStyled, Title, Column2, Images, Select, FlexRow, Button, Input} from './../styled'
import {calcModifier} from './../helpers/rules'

export default ({route, navigation}) =>
{
    const person = route.params.person
    const color = `rgba(255, 255, 255, .4)`

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
            </Container>

            <Container>
                <Title>atributos:</Title>

                <Column2>
                <ContainerInfo width="48">
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
        </Background>
    )
}