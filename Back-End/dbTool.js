const SELECT = (field, table, condition) => {
    let conditionStr = '';
    table = typeof tableTemp === 'object' ? table : [table];
    field = typeof field === 'object' ? field : [field];
    if (condition != undefined) {
        let tmp = [...condition];
        for (let i = 0; i < tmp.length; ++i) {
            conditionStr += `${tmp[i].field1} ${tmp[i].opea} "${tmp[i].field2}" and `
        }
        conditionStr = conditionStr.substr(0, conditionStr.length - 5)
    }
    if(condition == undefined) {
        return `select ${field.join(',')} from ${table.join(',')};`
    } else {
        return `select ${field.join(',')} from ${table.join(',')} where ${conditionStr};`
    }
}

const INSERT = (table, values, fields) => `insert into ${table}(${fields}) values (${values.map(ele => `"${ele}"`)});`;

const UPDATE = (table, fields, value, condition) => {
    let conditionStr = '';
    if(condition != undefined) {
        let tmp = [...condition];
        for(let i=0 ; i < tmp.length ; ++i) {
            conditionStr += `${tmp[i].field1} ${tmp[i].opea} "${tmp[i].field2}" and`
        }
        conditionStr = conditionStr.substr(0, conditionStr.length - 4);
    }
    return `update ${table} set ${fields} = "${value}" where ${conditionStr};`
}
module.exports = {
    SELECT,
    INSERT,
    UPDATE
};