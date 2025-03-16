// task 1

const musicCollection = [
    { title: 'GOD SYSTEM', artist: 'Kai Angel', year: 2024 },
    { title: 'glory of heartbroken', artist: 'fallen777angel', year: 2024 },
    { title: 'Gods Favourite', artist: 'Kennedy vintage', year: 2024 }
];

musicCollection[Symbol.iterator] = function () {
    let index = 0;
    const self = this;

    return {
        next() {
            return index < self.length ? { done: false, value: self[index++] } : { done: true };
        }
    }
};

for (let music of musicCollection) {
    console.log(`${music.title} - ${music.artist} (${music.year})`);
}


// task 2


const chefs = new Map([
    ['Виктор', 'Пицца'],
    ['Ольга', 'Суши'],
    ['Дмитрий', 'Десерты']
]);

const dishes = new Map([
    ['Пицца "Маргарита"', 'Виктор'],
    ['Пицца "Пепперони"', 'Виктор'],
    ['Суши "Филадельфия"', 'Ольга'],
    ['Суши "Калифорния"', 'Ольга'],
    ['Тирамису ', 'Дмитрий'],
    ['Чизкейк ', 'Дмитрий'],
]);

const orders = new Map([
    ['Алексей', new Set(['Пицца "Пепперони', 'Тирамису'])],
    ['Мария', new Set(['Суши "Калифорния"', 'Пицца "Маргарита"'])],
    ['Ирина', new Set(['Чизкейк'])],
]);

function addOrder(name, dish) {
    if (orders.has(name)) {
        const clientOrders = orders.get(name);
        clientOrders.add(dish);
    } else {
        const newClientOrders = new Set([dish]);
        orders.set(name, newClientOrders);
    }

    return orders.get(name);
};

function getDishesChef(chefName) {
    const chefDishes = [];

    dishes.forEach((cook, dishName) => {
        if (cook === chefName) {
            chefDishes.push(dishName)
        }
    });

    if (chefDishes.length === 0) {
        return [];
    }

    return chefDishes;
};

function getDishesClient(clientName) {
    if (orders.has(clientName)) {
        return [...orders.get(clientName)]
    } else {
        return [];
    }
};