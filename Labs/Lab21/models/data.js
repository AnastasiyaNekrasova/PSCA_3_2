const fs = require('fs');
let data = require('./data.json') || [];

module.exports =
{
    getPhones: () => data,

    getPhoneById: id => data.find(phone => phone.id === Number(id)),

    addPhone(fields) {
        const { fio, number } = fields;
        if (!fio || !number) {
            throw new Error('Empty fio or number fields');
        }
        const newPhone =
        {
            id: nextId(),
            //id: data.length,
            fio,
            number
        };
        data.push(newPhone);
        save();
        return newPhone;
    },

    updatePhone(fields) {
        const { id, fio, number } = fields;
        if (!id || !fio || !number) {
            throw new Error('Empty id, fullName or phone fields');
        }
        let targetPhone = data.find(phone => phone.id === Number(id));
        if (!targetPhone) {
            throw new Error('Invalid record id');
        }
        targetPhone.fio = fio;
        targetPhone.number = number;
        save();
        return targetPhone;
    },

    deletePhone(fields) {
        const { id, fio, number } = fields;
        let targetPhone = data.find(phone => phone.id == Number(id));
        if (!targetPhone) {
            throw new Error('Invalid record id');
        }
        data = data.filter(phone => phone.id !== Number(id));
        save();
        return targetPhone;
    }
};

function save() {
    fs.writeFile(__dirname + '/data.json', JSON.stringify(data, null, '  '), err => {
        if (err) {
            throw err;
        }
    });
}

function nextId() {
    return data[data.length - 1].id + 1
}