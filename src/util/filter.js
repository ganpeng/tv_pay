import tinytime from 'tinytime';
const FILTERS = {
    changeMoney(num) {
        const regexp = /(?:\.0*|(\.\d+?)0+)$/;
        if (num > 1000000) {
            num = JSON.stringify(num).slice(0, JSON.stringify(num).length - 4) / 100;
            return num + '万';
        } else {
            num = (num / 100).toFixed(2);
            num = num.replace(regexp, '$1');
            return num;
        }
    },
    dateFormat(timeStamp) {
        const template = tinytime('{YYYY}-{Mo}-{DD}', { padMonth: true });
        return timeStamp ? template.render(new Date(timeStamp)) : '';
    },
    dateTimeFormat(timeStamp) {
        const template = tinytime('{YYYY}-{Mo}-{DD} {h}:{mm}:{ss}', { padMonth: true });
        return timeStamp ? template.render(new Date(timeStamp)) : '';
    },
    // 数字和字母的对应关系
    numberToChar(num) {
        const map =  {
            0: 'A',
            1: 'B',
            2: 'C',
            3: 'D',
            4: 'E',
            5: 'F',
            6: 'G',
            7: 'H',
            8: 'I',
            9: 'J',
            10: 'K'
        };

        return map[num];
    },
    // PRIMARY | JUNIOR | SENIOR | BACHELOR | MASTER | DOCTOR
    culturalDegree(key) {
        let value = '';
        switch (key) {
            case 'PRIMARY':
                value = '小学';
                break;
            case 'JUNIOR':
                value = '初中';
                break;
            case 'SENIOR':
                value = '高中';
                break;
            case 'BACHELOR':
                value = '本科';
                break;
            case 'MASTER':
                value = '硕士';
                break;
            case 'DOCTOR':
                value = '博士';
                break;
            default:
                break;
        }
        return value;
    },
    gender(key) {
        let value = '';
        switch (key) {
            case 1:
                value = '男';
                break;
            case 2:
                value = '女';
                break;
            case 3:
                value = '其他';
                break;
            default:
                break;
        }
        return value;
    },
    marriage(key) {
        let value = '';
        switch (key) {
            case 1:
                value = '已婚';
                break;
            case 2:
                value = '未婚';
                break;
            case 3:
                value = '其他';
                break;
            default:
                break;
        }
        return value;
    }
};

export default (global) => {
    for (let filter in FILTERS) {
        global.filter(filter, FILTERS[filter]);
    }
};
