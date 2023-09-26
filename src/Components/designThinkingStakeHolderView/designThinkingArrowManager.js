export const designThinkingArrowManager = (arrowType, arrowImpact) => {
    if(arrowType === 'hasInfluenced' && arrowImpact === "impactLow"){
        var hide1 = document.querySelectorAll(".isInfluencedEndpointLow");
        var hide2 = document.querySelectorAll(".isInfluencedEndpointMed");
        var hide3 = document.querySelectorAll(".isInfluencedEndpointStrong");
        var hide4 = document.querySelectorAll(".biArrowEndpointLow");
        var hide5 = document.querySelectorAll(".biArrowEndpointMed");
        var hide6 = document.querySelectorAll(".biArrowEndpointStrong");
        var hide7 = document.querySelectorAll(".hasInfluencedEndpointMed");
        var hide8 = document.querySelectorAll(".hasInfluencedEndpointStrong");
        var show = document.querySelectorAll(".hasInfluencedEndpointLow");
    }else if(arrowType === 'hasInfluenced' && arrowImpact === "impactMedium"){
        var hide1 = document.querySelectorAll(".isInfluencedEndpointLow");
        var hide2 = document.querySelectorAll(".isInfluencedEndpointMed");
        var hide3 = document.querySelectorAll(".isInfluencedEndpointStrong");
        var hide4 = document.querySelectorAll(".biArrowEndpointLow");
        var hide5 = document.querySelectorAll(".biArrowEndpointMed");
        var hide6 = document.querySelectorAll(".biArrowEndpointStrong");
        var hide7 = document.querySelectorAll(".hasInfluencedEndpointLow");
        var hide8 = document.querySelectorAll(".hasInfluencedEndpointStrong");
        var show = document.querySelectorAll(".hasInfluencedEndpointMed");
    }else if(arrowType === 'hasInfluenced' && arrowImpact === "impactStrong"){
        var hide1 = document.querySelectorAll(".isInfluencedEndpointLow");
        var hide2 = document.querySelectorAll(".isInfluencedEndpointMed");
        var hide3 = document.querySelectorAll(".isInfluencedEndpointStrong");
        var hide4 = document.querySelectorAll(".biArrowEndpointLow");
        var hide5 = document.querySelectorAll(".biArrowEndpointMed");
        var hide6 = document.querySelectorAll(".biArrowEndpointStrong");
        var hide7 = document.querySelectorAll(".hasInfluencedEndpointLow");
        var hide8 = document.querySelectorAll(".hasInfluencedEndpointMed");
        var show = document.querySelectorAll(".hasInfluencedEndpointStrong");
    }else if(arrowType === 'isInfluenced' && arrowImpact === "impactLow"){
        var hide1 = document.querySelectorAll(".hasInfluencedEndpointStrong");
        var hide2 = document.querySelectorAll(".isInfluencedEndpointMed");
        var hide3 = document.querySelectorAll(".isInfluencedEndpointStrong");
        var hide4 = document.querySelectorAll(".biArrowEndpointLow");
        var hide5 = document.querySelectorAll(".biArrowEndpointMed");
        var hide6 = document.querySelectorAll(".biArrowEndpointStrong");
        var hide7 = document.querySelectorAll(".hasInfluencedEndpointLow");
        var hide8 = document.querySelectorAll(".hasInfluencedEndpointMed");
        var show = document.querySelectorAll(".isInfluencedEndpointLow");
    }else if(arrowType === 'isInfluenced' && arrowImpact === "impactMedium"){
        var hide1 = document.querySelectorAll(".hasInfluencedEndpointStrong");
        var hide2 = document.querySelectorAll(".isInfluencedEndpointLow");
        var hide3 = document.querySelectorAll(".isInfluencedEndpointStrong");
        var hide4 = document.querySelectorAll(".biArrowEndpointLow");
        var hide5 = document.querySelectorAll(".biArrowEndpointMed");
        var hide6 = document.querySelectorAll(".biArrowEndpointStrong");
        var hide7 = document.querySelectorAll(".hasInfluencedEndpointLow");
        var hide8 = document.querySelectorAll(".hasInfluencedEndpointMed");
        var show = document.querySelectorAll(".isInfluencedEndpointMed");
    }else if(arrowType === 'isInfluenced' && arrowImpact === "impactStrong"){
        var hide1 = document.querySelectorAll(".hasInfluencedEndpointStrong");
        var hide2 = document.querySelectorAll(".isInfluencedEndpointMed");
        var hide3 = document.querySelectorAll(".isInfluencedEndpointLow");
        var hide4 = document.querySelectorAll(".biArrowEndpointLow");
        var hide5 = document.querySelectorAll(".biArrowEndpointMed");
        var hide6 = document.querySelectorAll(".biArrowEndpointStrong");
        var hide7 = document.querySelectorAll(".hasInfluencedEndpointLow");
        var hide8 = document.querySelectorAll(".hasInfluencedEndpointMed");
        var show = document.querySelectorAll(".isInfluencedEndpointStrong");
    }else if(arrowType === 'equalInfluenced' && arrowImpact === "impactLow"){
        var hide1 = document.querySelectorAll(".hasInfluencedEndpointStrong");
        var hide2 = document.querySelectorAll(".isInfluencedEndpointMed");
        var hide3 = document.querySelectorAll(".isInfluencedEndpointLow");
        var hide4 = document.querySelectorAll(".isInfluencedEndpointStrong");
        var hide5 = document.querySelectorAll(".biArrowEndpointMed");
        var hide6 = document.querySelectorAll(".biArrowEndpointStrong");
        var hide7 = document.querySelectorAll(".hasInfluencedEndpointLow");
        var hide8 = document.querySelectorAll(".hasInfluencedEndpointMed");
        var show = document.querySelectorAll(".biArrowEndpointLow");
    }else if(arrowType === 'equalInfluenced' && arrowImpact === "impactMedium"){
        var hide1 = document.querySelectorAll(".hasInfluencedEndpointStrong");
        var hide2 = document.querySelectorAll(".isInfluencedEndpointMed");
        var hide3 = document.querySelectorAll(".isInfluencedEndpointLow");
        var hide4 = document.querySelectorAll(".biArrowEndpointLow");
        var hide5 = document.querySelectorAll(".isInfluencedEndpointStrong");
        var hide6 = document.querySelectorAll(".biArrowEndpointStrong");
        var hide7 = document.querySelectorAll(".hasInfluencedEndpointLow");
        var hide8 = document.querySelectorAll(".hasInfluencedEndpointMed");
        var show = document.querySelectorAll(".biArrowEndpointMed");
    }else if(arrowType === 'equalInfluenced' && arrowImpact === "impactStrong"){
        var hide1 = document.querySelectorAll(".hasInfluencedEndpointStrong");
        var hide2 = document.querySelectorAll(".isInfluencedEndpointMed");
        var hide3 = document.querySelectorAll(".isInfluencedEndpointLow");
        var hide4 = document.querySelectorAll(".biArrowEndpointLow");
        var hide5 = document.querySelectorAll(".biArrowEndpointMed");
        var hide6 = document.querySelectorAll(".isInfluencedEndpointStrong");
        var hide7 = document.querySelectorAll(".hasInfluencedEndpointLow");
        var hide8 = document.querySelectorAll(".hasInfluencedEndpointMed");
        var show = document.querySelectorAll(".biArrowEndpointStrong");
    }
    for(let i = 0; i < hide1.length; i++){
        hide1[i].style.display = "none";
        hide2[i].style.display = "none";
        hide3[i].style.display = "none";
        hide4[i].style.display = "none";
        hide5[i].style.display = "none";
        hide6[i].style.display = "none";
        hide7[i].style.display = "none";
        hide8[i].style.display = "none";
        show[i].style.display = "block";
    }
}