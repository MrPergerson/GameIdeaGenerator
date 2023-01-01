$(document).ready(function() {
    $('#generate').click(()=>generateIdea());
});

function generateIdea()
{
    let list = getListAsArray('mechanics');
    let mechanic1 = pickRandom(list);
    let mechanic2 = pickRandom(list);

    $('#idea').text(`Make a game where you ${mechanic1} when you ${mechanic2}.`);
}

function pickRandom(list)
{
    let randomIndex = Math.floor(Math.random() * list.length);
    return list[randomIndex];
}

function getListAsArray(listName)
{
    let start = `#${listName}:\n`;
    let end = `\n#end`;
    return getTextBetweenTags(data, start, end).split('\n');
}

function getTextBetweenTags(text, startTag, endTag)
{
    return text.split(startTag)[1].split(endTag)[0];
}