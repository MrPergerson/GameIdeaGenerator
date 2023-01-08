$(document).ready(function() {
    $('#generate').click(()=>generateIdea());
});

function generateIdea()
{

    
    let template = pickRandom('template');

    let result = fillInTemplate(template);

    $('#idea').text(result);
}

function fillInTemplate(template)
{
    // if includes @
        // get text between @ and @
        // find function for generator found
        // replace text
        // call fillInTemplate
    if(template.includes('@'))
    {
        let generator = getTextBetweenTags(template, '@','@');
        let replacement = 'NO TEXT FOUND';

        switch(generator)
        {
            case 'mood':
                replacement = generateMood();
                break;
            case 'character':
                replacement = generateCharacter();
                break;
            case 'setting':
                replacement = generateSetting();
                break;
            case 'setting_description':
                replacement = generateSettingDescription();
                break;
            case 'mechanic':
                replacement = generateMechanic();
                break;
            case 'goal':
                replacement = generateGoal();
                break;
            case 'constraint':
                replacement = generateConstraint();
                break;

        }

        template = replaceTextBetweenTags(template, replacement, '@','@');

        //console.log(template);
        return fillInTemplate(template);
    }
    
    // if includes <a>
        // get first word after <a>
        // pick either a or an
        // call fillInTemplate
    if(template.includes('<a>'))
    {
        let startIndex = template.indexOf('>') + 2;
        let nextWord = template.substring(startIndex);
        let replacement = indefiniteArticle(nextWord);
        
        template = replaceTextBetweenTags(template, replacement, '<','>');

        return fillInTemplate(template);
    }
    
    // if includes (
        // pick conjugation of verb based on character being singular or plural
        // call fillInTemplate
    return template;
}

function generateMood()
{
    return pickRandom('mood');
}


function generateCharacter()
{
    let preDescription = pickRandom('character_description');
    let character = pickRandom('character');

    return ' <a> ' + preDescription + ' ' + character;
}

function generateGoal()
{
    return pickRandom('goal');
}

function generateSetting()
{
    return pickRandom('setting');
}

function generateSettingDescription()
{
    return pickRandom('setting_description');
}

function generateMechanic()
{
    return pickRandom('mechanic');
}

function generateConstraint()
{
    return pickRandom('constraint');
}


function pickRandom(listName)
{
    let list = getListAsArray(listName);
    let randomIndex = Math.floor(Math.random() * list.length);
    let result = resolveOptions(list[randomIndex]);

    return result;
}

function getListAsArray(listName)
{
    let start = `#${listName}:\n`;
    let end = `\n#end`;
    return getTextBetweenTags(data, start, end).split('\n');
}

function getRandomFromList(list)
{
    let randomIndex = Math.floor(Math.random() * list.length);
    return list[randomIndex];
}

function resolveOptions(text)
{
    if(text.includes('['))
    {
        let list = getTextBetweenTags(text, '[',']');
        let randomChoice = getRandomFromList(list.split(','));
        text = replaceTextBetweenTags(text, randomChoice, '[',']');
        return resolveOptions(text);
    }

    return text;
    
}

function getTextBetweenTags(text, startTag, endTag)
{
    return text.split(startTag)[1].split(endTag)[0];
}

function replaceTextBetweenTags(text, replacement, startTag, endTag)
{
    let startIndex = text.indexOf(startTag);
    let endIndex = text.indexOf(endTag, startIndex+1);

    return text.substring(0,startIndex) + replacement + text.substring(endIndex+1);
}

function indefiniteArticle(word)
{
    word = word.trim();

	if (word.startsWith('one') || word.startsWith('uni')) {
		return 'a';
	}

    let vowels = 'aeiou';

	if (vowels.includes(word[0])) {
		return 'an';
	}
	
	return 'a';

}