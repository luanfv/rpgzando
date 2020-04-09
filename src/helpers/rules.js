export const handleRace = (race, type) =>
{
    let isError = false
    const attributes = {
        for: 0,
        des: 0,
        con: 0,
        sab: 0,
        int: 0,
        car: 0,
    }

    switch (race) {
        case 1:
            attributes.con = attributes.con + 2 

            if(type === 1) 
                attributes.sab = attributes.sab + 1
            else if(type === 2) 
                attributes.for = attributes.for + 2
            else
                isError = true
        break;
        case 2:
            attributes.for = attributes.for + 2 
            attributes.car = attributes.car + 1
        break;
        case 3:
            attributes.des = attributes.des + 2 

            if(type === 1) 
                attributes.int = attributes.int + 1
            else if(type === 2) 
                attributes.sab = attributes.sab + 1
            else if(type === 2) 
                attributes.car = attributes.car + 1
            else
                isError = true
        break;
        case 4:
            attributes.int = attributes.int + 2 

            if(type === 1) 
                attributes.des = attributes.des + 1
            else if(type === 2) 
                attributes.con = attributes.con + 1
            else
                isError = true
        break;
        case 5:
            attributes.des = attributes.des + 2 

            if(type === 1) 
                attributes.car = attributes.car + 1
            else if(type === 2) 
                attributes.con = attributes.con + 1
            else
                isError = true
        break;
        case 6:
            attributes.for = attributes.for + 1 
            attributes.des = attributes.des + 1 
            attributes.con = attributes.con + 1 
            attributes.sab = attributes.sab + 1 
            attributes.int = attributes.int + 1 
            attributes.car = attributes.car + 1
        break;
        default:
            isError = true;
        break;
    }

    return isError ? null : attributes
}