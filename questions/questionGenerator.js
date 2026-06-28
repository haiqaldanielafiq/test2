/**
 * Question Generator Module
 * Generates DSKP-compliant questions for Money (Wang) - Year 4.
 */

const QuestionGenerator = {
    topics: {
        addition: 'Penambahan Wang',
        subtraction: 'Penolakan Wang',
        problemSolving: 'Penyelesaian Masalah',
        shopping: 'Simulasi Membeli-belah',
        trueFalse: 'Betul atau Salah',
        fillBlank: 'Isi Tempat Kosong'
    },

    assets: {
        notes: {
            RM1: '💵 RM1',
            RM5: '💵 RM5',
            RM10: '💵 RM10',
            RM20: '💵 RM20',
            RM50: '💵 RM50',
            RM100: '💵 RM100'
        },
        items: [
            { name: 'Beg Sekolah', price: 45, icon: '🎒' },
            { name: 'Buku Cerita', price: 12, icon: '📚' },
            { name: 'Pensel', price: 2, icon: '✏️' },
            { name: 'Kasut Sukan', price: 65, icon: '👟' },
            { name: 'Botol Air', price: 15, icon: '🍼' },
            { name: 'Aiskrim', price: 3, icon: '🍦' },
            { name: 'Burger', price: 8, icon: '🍔' },
            { name: 'Bola Sepak', price: 35, icon: '⚽' },
            { name: 'Susu', price: 6, icon: '🥛' },
            { name: 'Coklat', price: 4, icon: '🍫' }
        ]
    },

    generateSet(levelId, count = 10) {
        const questions = [];
        const maxRange = levelId * 20;
        const minRange = maxRange - 20;

        for (let i = 0; i < count; i++) {
            const type = Math.floor(Math.random() * 6);
            let q;

            switch (type) {
                case 0: q = this.createAddition(minRange, maxRange); break;
                case 1: q = this.createSubtraction(minRange, maxRange); break;
                case 2: q = this.createProblemSolving(minRange, maxRange); break;
                case 3: q = this.createShopping(minRange, maxRange); break;
                case 4: q = this.createTrueFalse(minRange, maxRange); break;
                case 5: q = this.createFillBlank(minRange, maxRange); break;
            }
            questions.push(q);
        }
        return questions;
    },

    createAddition(min, max) {
        const v1 = Math.floor(Math.random() * (max / 2)) + 1;
        const v2 = Math.floor(Math.random() * (max / 2)) + 1;
        const answer = v1 + v2;

        return {
            topic: this.topics.addition,
            text: `Berapakah jumlah RM${v1} + RM${v2}?`,
            illustration: '➕',
            answer: `RM${answer}`,
            choices: this.generateChoices(answer, 'RM'),
            explanation: `Langkah: RM${v1} + RM${v2} = RM${answer}.`
        };
    },

    createSubtraction(min, max) {
        const v1 = Math.floor(Math.random() * (max - min)) + min;
        const v2 = Math.floor(Math.random() * (v1 - 1)) + 1;
        const answer = v1 - v2;

        return {
            topic: this.topics.subtraction,
            text: `RM${v1} - RM${v2} = ?`,
            illustration: '➖',
            answer: `RM${answer}`,
            choices: this.generateChoices(answer, 'RM'),
            explanation: `Langkah: RM${v1} - RM${v2} = RM${answer}.`
        };
    },

    createProblemSolving(min, max) {
        const item = this.assets.items[Math.floor(Math.random() * this.assets.items.length)];
        const wallet = [10, 20, 50, 100].find(v => v >= item.price && v <= max) || 100;
        const change = wallet - item.price;

        return {
            topic: this.topics.problemSolving,
            text: `Ali mempunyai RM${wallet}. Dia membeli ${item.name} (${item.icon}) yang berharga RM${item.price}. Berapakah baki wangnya?`,
            illustration: item.icon,
            answer: `RM${change}`,
            choices: this.generateChoices(change, 'RM'),
            explanation: `Langkah: RM${wallet} - RM${item.price} = RM${change}.`
        };
    },

    createShopping(min, max) {
        const item1 = this.assets.items[Math.floor(Math.random() * this.assets.items.length)];
        const item2 = this.assets.items[Math.floor(Math.random() * this.assets.items.length)];
        const total = item1.price + item2.price;

        return {
            topic: this.topics.shopping,
            text: `Siti membeli ${item1.name} ${item1.icon} dan ${item2.name} ${item2.icon}. Berapakah jumlah bayaran Siti?`,
            illustration: '🛒',
            answer: `RM${total}`,
            choices: this.generateChoices(total, 'RM'),
            explanation: `Langkah: RM${item1.price} (Harga ${item1.name}) + RM${item2.price} (Harga ${item2.name}) = RM${total}.`
        };
    },

    createTrueFalse(min, max) {
        const v1 = Math.floor(Math.random() * (max / 2)) + 1;
        const v2 = Math.floor(Math.random() * (max / 2)) + 1;
        const correctSum = v1 + v2;
        const isTrue = Math.random() > 0.5;
        const displaySum = isTrue ? correctSum : correctSum + (Math.random() > 0.5 ? 1 : -1);

        return {
            topic: this.topics.trueFalse,
            text: `Adakah RM${v1} + RM${v2} bersamaan dengan RM${displaySum}?`,
            illustration: '❓',
            answer: isTrue ? 'Betul' : 'Salah',
            choices: ['Betul', 'Salah'],
            explanation: isTrue
                ? `Ya, RM${v1} + RM${v2} sememangnya RM${correctSum}.`
                : `Tidak, RM${v1} + RM${v2} adalah RM${correctSum}, bukan RM${displaySum}.`
        };
    },

    createFillBlank(min, max) {
        const answer = Math.floor(Math.random() * (max / 2)) + 5;
        const v1 = Math.floor(Math.random() * (answer - 1)) + 1;
        const v2 = answer - v1;

        return {
            topic: this.topics.fillBlank,
            text: `RM${v1} + [ ? ] = RM${answer}`,
            illustration: '📝',
            answer: `RM${v2}`,
            choices: this.generateChoices(v2, 'RM'),
            explanation: `Untuk mencari anu: RM${answer} - RM${v1} = RM${v2}.`
        };
    },

    generateChoices(correctValue, prefix = '') {
        const choices = new Set();
        choices.add(`${prefix}${correctValue}`);

        while (choices.size < 4) {
            const offset = Math.floor(Math.random() * 10) + 1;
            const wrong = Math.random() > 0.5 ? correctValue + offset : Math.max(1, correctValue - offset);
            choices.add(`${prefix}${wrong}`);
        }

        return Array.from(choices).sort(() => Math.random() - 0.5);
    }
};

window.QuestionGenerator = QuestionGenerator;
