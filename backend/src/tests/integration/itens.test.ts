import { defineFeature, loadFeature } from 'jest-cucumber';
import { PrismaClient } from '@prisma/client';

import database from '../database/connection';
import request from 'supertest';
import app from '../../app';

const feature = loadFeature('../backend/src/tests/features/itens-cadastro.feature');

defineFeature(feature, test => {

    test('Criar Item', ({ given, when, then, and }) => {
        const prismaTestClient = new PrismaClient();

        given(/^I don't have any item with name "(.*)"$/, async (name) => {
            await database.connect();
            const itemExists = await prismaTestClient.item.findFirst({
                where: {
                    name
                }
            });

            expect(itemExists).toBe(null);
        });

        when(/^I insert a item with: name "(.*)", price "(.*)", category "(.*)", description "(.*)", image "(.*)", colors "(.*)", sizes "(.*)", amount "(.*)"$/, async (
            name, price, category, description, image, colors, sizes, amount
        ) => {
            const newItem = await prismaTestClient.item.create({
                data: {
                    name,
                    price: Number(price),
                    category,
                    description,
                    image,
                    colors,
                    sizes,
                    amount: Number(amount)
                }
            })

            expect(newItem).toHaveProperty('name', name);
            expect(newItem).toHaveProperty('price', Number(price));
            expect(newItem).toHaveProperty('category', category);
            expect(newItem).toHaveProperty('description', description);
            expect(newItem).toHaveProperty('image', image);
            expect(newItem).toHaveProperty('colors', colors);
            expect(newItem).toHaveProperty('sizes', sizes);
            expect(newItem).toHaveProperty('amount', Number(amount));
        });

        then(/^I should have a item with name "(.*)"$/, async (name) => {
            const item = await prismaTestClient.item.findFirst({
                where: {
                    name,
                }
            });

            expect(item).toHaveProperty('name', name);
        });

        and(/^I should have this item with id "(.*)"$/, async (id) => {
            const item = await prismaTestClient.item.findFirst({
                where: {
                    id: Number(id),
                }
            });

            expect(item).toHaveProperty('id', Number(id));

            await database.clearValues();
            await database.disconnect();
        });

    });

});