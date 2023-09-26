export const designThinkingStakeHolderScopeReturner = (records , source, target ,influence, impact) => {
    if(influence === 'has' && impact === 'low'){
        let ep = {};
        ep.source = records[Number(source)].haslow;
        ep.target = records[Number(target)].haslow;
        return ep;
    }
    if(influence === 'has' && impact === 'medium'){
        let ep = {};
        ep.source = records[Number(source)].hasmed;
        ep.target = records[Number(target)].hasmed;
        return ep;
    }
    if(influence === 'has' && impact === 'strong'){
        let ep = {};
        ep.source = records[Number(source)].hasstr;
        ep.target = records[Number(target)].hasstr;
        return ep;
    }
    if(influence === 'is' && impact === 'low'){
        let ep = {};
        ep.source = records[Number(source)].islow;
        ep.target = records[Number(target)].islow;
        return ep;
    }
    if(influence === 'is' && impact === 'medium'){
        let ep = {};
        ep.source = records[Number(source)].ismed;
        ep.target = records[Number(target)].ismed;
        return ep;
    }
    if(influence === 'is' && impact === 'strong'){
        let ep = {};
        ep.source = records[Number(source)].isstr;
        ep.target = records[Number(target)].isstr;
        return ep;
    }
    if(influence === 'equal' && impact === 'low'){
        let ep = {};
        ep.source = records[Number(source)].bilow;
        ep.target = records[Number(target)].bilow;
        return ep;
    }
    if(influence === 'equal' && impact === 'medium'){
        let ep = {};
        ep.source = records[Number(source)].bimed;
        ep.target = records[Number(target)].bimed;
        return ep;
    }
    if(influence === 'equal' && impact === 'strong'){
        let ep = {};
        ep.source = records[Number(source)].bistr;
        ep.target = records[Number(target)].bistr;
        return ep;
    }
}