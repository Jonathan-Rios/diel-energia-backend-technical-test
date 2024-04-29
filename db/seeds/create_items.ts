
import { Knex } from "knex";

export async function seed(knex: Knex) {
  await knex('tasks').insert([
    // Registro Diário
    {id: '6b482e61-308a-4885-a475-1043d0707593', title: 'Task 1', description: 'Description for Task 1',  due_at: new Date(new Date().setHours(9, 0, 0, 0)).toISOString(), duration_minutes: 15, created_at: '2024-04-27T03:00:00.000Z', updated_at: null, deleted_at: null},
    {id: '613e33c3-c917-4fcf-972d-34e9022a0c6c', title: 'Task 2', description: 'Description for Task 2',  due_at: new Date(new Date().setHours(12, 0, 0, 0)).toISOString(), duration_minutes: 15, created_at: '2024-04-27T03:00:00.000Z', updated_at: null, deleted_at: null},
    {id: 'ca6ba2b4-5254-4698-a9fb-eae8ed35f256', title: 'Task 3', description: 'Description for Task 3',  due_at: new Date(new Date().setHours(15, 0, 0, 0)).toISOString(), duration_minutes: 15, created_at: '2024-04-27T03:00:00.000Z', updated_at: null, deleted_at: null},
    {id: '02e2488d-6806-4139-9457-0cdbd6acd7b5', title: 'Task 4', description: 'Description for Task 4',  due_at: new Date(new Date().setHours(18, 0, 0, 0)).toISOString(), duration_minutes: 15, created_at: '2024-04-27T03:00:00.000Z', updated_at: null, deleted_at: null},
    {id: 'bb13ea95-3c9e-49e2-a0b6-c50ebf6acfae', title: 'Task 5', description: 'Description for Task 5',  due_at: new Date(new Date().setHours(23, 0, 0, 0)).toISOString(), duration_minutes: 15, created_at: '2024-04-27T03:00:00.000Z', updated_at: null, deleted_at: null},

    // Registro Semanal
    {id: 'f5394fd6-b3f6-4789-8b68-61ffe65b53de', title: 'Weekly Task 1', description: 'Description for Weekly Task 1', due_at: '2024-04-29T10:00:00.000Z', duration_minutes: 15, created_at: knex.fn.now(), updated_at: null, deleted_at: null},
    {id: 'b76e6000-8567-4147-b60f-35c9be121460', title: 'Weekly Task 1', description: 'Description for Weekly Task 1', due_at: '2024-04-30T06:00:00.000Z', duration_minutes: 15, created_at: knex.fn.now(), updated_at: null, deleted_at: null},
    {id: '33815c43-ca01-4b6b-a340-8e6f74abbed9', title: 'Weekly Task 1', description: 'Description for Weekly Task 1', due_at: '2024-05-01T10:00:00.000Z', duration_minutes: 15, created_at: knex.fn.now(), updated_at: null, deleted_at: null},
    {id: 'a5c65d61-49a2-40ef-b14e-baad0a409c9f', title: 'Weekly Task 1', description: 'Description for Weekly Task 1', due_at: '2024-05-02T06:00:00.000Z', duration_minutes: 15, created_at: knex.fn.now(), updated_at: null, deleted_at: null},
    {id: '0a02a146-5eb9-4cc8-9feb-ea70cf2e9f96', title: 'Weekly Task 1', description: 'Description for Weekly Task 1', due_at: '2024-05-03T10:00:00.000Z', duration_minutes: 15, created_at: knex.fn.now(), updated_at: null, deleted_at: null},
    {id: '6405f9a6-e557-4a34-a294-1ebfbd3f885b', title: 'Weekly Task 1', description: 'Description for Weekly Task 1', due_at: '2024-05-04T06:00:00.000Z', duration_minutes: 15, created_at: knex.fn.now(), updated_at: null, deleted_at: null},
    {id: '377916e4-6c79-45d6-9664-9e83d676890f', title: 'Weekly Task 1', description: 'Description for Weekly Task 1', due_at: '2024-05-05T10:00:00.000Z', duration_minutes: 15, created_at: knex.fn.now(), updated_at: null, deleted_at: null},
    {id: 'd2334914-781a-40e5-9212-07020ab41b9d', title: 'Weekly Task 1', description: 'Description for Weekly Task 1', due_at: '2024-05-06T06:00:00.000Z', duration_minutes: 15, created_at: knex.fn.now(), updated_at: null, deleted_at: null},
    {id: '001dcb9c-7a14-4beb-a0e6-2693ffbc0721', title: 'Weekly Task 1', description: 'Description for Weekly Task 1', due_at: '2024-05-07T10:00:00.000Z', duration_minutes: 15, created_at: knex.fn.now(), updated_at: null, deleted_at: null},

    // Registro Mensal
    {id: 'c8c7b840-d534-41b1-b35d-3dee681c4d05', title: 'Monthly Task 1',  description: 'Description for Monthly Task 1', due_at: '2024-04-01T03:00:00.000Z', duration_minutes: 15, created_at: knex.fn.now(), updated_at: null, deleted_at: null},
    {id: '2f1f15c4-bbce-425c-a688-69b016db8b3f', title: 'Monthly Task 2',  description: 'Description for Monthly Task 2', due_at: '2024-04-02T03:00:00.000Z', duration_minutes: 15, created_at: knex.fn.now(), updated_at: null, deleted_at: null},
    {id: '8217578f-b7d6-475e-aff2-948f16b569a5', title: 'Monthly Task 3',  description: 'Description for Monthly Task 3', due_at: '2024-04-03T03:00:00.000Z', duration_minutes: 15, created_at: knex.fn.now(), updated_at: null, deleted_at: null},
    {id: 'b715363d-a51b-4289-a920-8b5c3e164b87', title: 'Monthly Task 4',  description: 'Description for Monthly Task 4', due_at: '2024-04-04T03:00:00.000Z', duration_minutes: 15, created_at: knex.fn.now(), updated_at: null, deleted_at: null},
    {id: 'cfeaf557-720a-46db-9448-9967752b49f2', title: 'Monthly Task 5',  description: 'Description for Monthly Task 5', due_at: '2024-04-05T03:00:00.000Z', duration_minutes: 15, created_at: knex.fn.now(), updated_at: null, deleted_at: null},
    {id: '2319aa36-df7a-48e7-ae9a-8c28281f0700', title: 'Monthly Task 6',  description: 'Description for Monthly Task 6', due_at: '2024-04-06T03:00:00.000Z', duration_minutes: 15, created_at: knex.fn.now(), updated_at: null, deleted_at: null},
    {id: '86841be6-bd59-43d6-8233-0083ac2e2839', title: 'Monthly Task 7',  description: 'Description for Monthly Task 7', due_at: '2024-04-07T03:00:00.000Z', duration_minutes: 15, created_at: knex.fn.now(), updated_at: null, deleted_at: null},
    {id: '144bd75a-81da-4409-b2a8-19a6a1a014cd', title: 'Monthly Task 8',  description: 'Description for Monthly Task 8', due_at: '2024-04-08T03:00:00.000Z', duration_minutes: 15, created_at: knex.fn.now(), updated_at: null, deleted_at: null},
    {id: '1569f5e3-0492-4db3-bd36-957d17657416', title: 'Monthly Task 9',  description: 'Description for Monthly Task 9', due_at: '2024-04-09T03:00:00.000Z', duration_minutes: 15, created_at: knex.fn.now(), updated_at: null, deleted_at: null},
    {id: 'fb59b735-743f-41cb-81b7-bd617fe79003', title: 'Monthly Task 10', description: 'Description for Monthly Task 10', due_at: '2024-04-10T03:00:00.000Z', duration_minutes: 15, created_at: knex.fn.now(), updated_at: null, deleted_at: null},
    {id: 'a352b204-93ff-4054-bf2b-dfa16d8467fd', title: 'Monthly Task 11', description: 'Description for Monthly Task 11', due_at: '2024-04-11T03:00:00.000Z', duration_minutes: 15, created_at: knex.fn.now(), updated_at: null, deleted_at: null},
    {id: 'fb4c240f-67fc-4d3d-b194-bcd8f5156c69', title: 'Monthly Task 12', description: 'Description for Monthly Task 12', due_at: '2024-04-12T03:00:00.000Z', duration_minutes: 15, created_at: knex.fn.now(), updated_at: null, deleted_at: null},
    {id: 'e6890b92-f175-40ee-b901-e66b36f313d1', title: 'Monthly Task 13', description: 'Description for Monthly Task 13', due_at: '2024-04-13T03:00:00.000Z', duration_minutes: 15, created_at: knex.fn.now(), updated_at: null, deleted_at: null},
    {id: '7bcfb515-373f-4a4d-8f54-2a587af0490c', title: 'Monthly Task 14', description: 'Description for Monthly Task 14', due_at: '2024-04-14T03:00:00.000Z', duration_minutes: 15, created_at: knex.fn.now(), updated_at: null, deleted_at: null},
    {id: '22e497d2-1374-4781-ad14-433e38e38288', title: 'Monthly Task 15', description: 'Description for Monthly Task 15', due_at: '2024-04-15T03:00:00.000Z', duration_minutes: 15, created_at: knex.fn.now(), updated_at: null, deleted_at: null},
    {id: '21effc99-2aa1-408d-a44c-c3d4e8b97953', title: 'Monthly Task 16', description: 'Description for Monthly Task 16', due_at: '2024-04-16T03:00:00.000Z', duration_minutes: 15, created_at: knex.fn.now(), updated_at: null, deleted_at: null},
    {id: '91749dd0-e204-4696-9205-ecbdbf0ea46a', title: 'Monthly Task 17', description: 'Description for Monthly Task 17', due_at: '2024-04-17T03:00:00.000Z', duration_minutes: 15, created_at: knex.fn.now(), updated_at: null, deleted_at: null},
    {id: 'ee2f49d8-b830-487f-a81b-dee50e308e5b', title: 'Monthly Task 18', description: 'Description for Monthly Task 18', due_at: '2024-04-18T03:00:00.000Z', duration_minutes: 15, created_at: knex.fn.now(), updated_at: null, deleted_at: null},
    {id: '67ad9e48-cd37-40e4-aac8-66d14b390593', title: 'Monthly Task 19', description: 'Description for Monthly Task 19', due_at: '2024-04-19T03:00:00.000Z', duration_minutes: 15, created_at: knex.fn.now(), updated_at: null, deleted_at: null},
    {id: '5d2d0df8-b35d-48e7-b551-719e2079f7c1', title: 'Monthly Task 20', description: 'Description for Monthly Task 20', due_at: '2024-04-20T03:00:00.000Z', duration_minutes: 15, created_at: knex.fn.now(), updated_at: null, deleted_at: null},
    {id: '89d48a33-33c3-4605-a714-fc420733a69a', title: 'Monthly Task 21', description: 'Description for Monthly Task 21', due_at: '2024-04-21T03:00:00.000Z', duration_minutes: 15, created_at: knex.fn.now(), updated_at: null, deleted_at: null},
    {id: 'f2645bef-ef0c-4b68-8ca5-4e9ffca488f3', title: 'Monthly Task 22', description: 'Description for Monthly Task 22', due_at: '2024-04-22T03:00:00.000Z', duration_minutes: 15, created_at: knex.fn.now(), updated_at: null, deleted_at: null},
    {id: '5ee060c6-c37e-4fc5-835a-656eff0e2c9b', title: 'Monthly Task 23', description: 'Description for Monthly Task 23', due_at: '2024-04-23T03:00:00.000Z', duration_minutes: 15, created_at: knex.fn.now(), updated_at: null, deleted_at: null},
    {id: '6949308f-953d-4149-9ed0-44a37b1d1193', title: 'Monthly Task 24', description: 'Description for Monthly Task 24', due_at: '2024-04-24T03:00:00.000Z', duration_minutes: 15, created_at: knex.fn.now(), updated_at: null, deleted_at: null},
    {id: 'd51b8fb1-a0be-4d05-b042-e87cea6c33f4', title: 'Monthly Task 25', description: 'Description for Monthly Task 25', due_at: '2024-04-25T03:00:00.000Z', duration_minutes: 15, created_at: knex.fn.now(), updated_at: null, deleted_at: null},
    {id: '803ff937-96ba-4291-aa14-5108b552ca45', title: 'Monthly Task 26', description: 'Description for Monthly Task 26', due_at: '2024-04-26T03:00:00.000Z', duration_minutes: 15, created_at: knex.fn.now(), updated_at: null, deleted_at: null},
    {id: 'fb108974-ef4d-4967-85e4-47fc7e83a2c5', title: 'Monthly Task 27', description: 'Description for Monthly Task 27', due_at: '2024-04-27T03:00:00.000Z', duration_minutes: 15, created_at: knex.fn.now(), updated_at: null, deleted_at: null},
    {id: 'fc16b1a1-18cc-427e-8ed3-b21068a13519', title: 'Monthly Task 28', description: 'Description for Monthly Task 28', due_at: '2024-04-28T03:00:00.000Z', duration_minutes: 15, created_at: knex.fn.now(), updated_at: null, deleted_at: null},
    {id: '70c488fc-2e09-4a87-bc86-7820ad880649', title: 'Monthly Task 29', description: 'Description for Monthly Task 29', due_at: '2024-04-29T03:00:00.000Z', duration_minutes: 15, created_at: knex.fn.now(), updated_at: null, deleted_at: null},
    {id: 'af2430c2-af85-4aba-a039-1e34d5dfc460', title: 'Monthly Task 30', description: 'Description for Monthly Task 30', due_at: '2024-04-30T03:00:00.000Z', duration_minutes: 15, created_at: knex.fn.now(), updated_at: null, deleted_at: null},
    {id: '16a8f69e-ffcc-4c00-bf92-b02491fceac8', title: 'Monthly Task 31', description: 'Description for Monthly Task 31', due_at: '2024-05-01T03:00:00.000Z', duration_minutes: 15, created_at: knex.fn.now(), updated_at: null, deleted_at: null},
    {id: '26a8f69e-ffcc-4c00-bf92-b02491fceac8', title: 'Monthly Task 32', description: 'Description for Monthly Task 32', due_at: '2024-05-02T03:00:00.000Z', duration_minutes: 15, created_at: knex.fn.now(), updated_at: null, deleted_at: null},
    {id: '36a8f69e-ffcc-4c00-bf92-b02491fceac8', title: 'Monthly Task 33', description: 'Description for Monthly Task 33', due_at: '2024-05-03T03:00:00.000Z', duration_minutes: 15, created_at: knex.fn.now(), updated_at: null, deleted_at: null},
    {id: '46a8f69e-ffcc-4c00-bf92-b02491fceac8', title: 'Monthly Task 34', description: 'Description for Monthly Task 34', due_at: '2024-05-04T03:00:00.000Z', duration_minutes: 15, created_at: knex.fn.now(), updated_at: null, deleted_at: null},
    {id: '56a8f69e-ffcc-4c00-bf92-b02491fceac8', title: 'Monthly Task 35', description: 'Description for Monthly Task 35', due_at: '2024-05-05T03:00:00.000Z', duration_minutes: 15, created_at: knex.fn.now(), updated_at: null, deleted_at: null},
    {id: '66a8f69e-ffcc-4c00-bf92-b02491fceac8', title: 'Monthly Task 36', description: 'Description for Monthly Task 36', due_at: '2024-05-06T03:00:00.000Z', duration_minutes: 15, created_at: knex.fn.now(), updated_at: null, deleted_at: null},
    {id: '76a8f69e-ffcc-4c00-bf92-b02491fceac8', title: 'Monthly Task 37', description: 'Description for Monthly Task 37', due_at: '2024-05-07T03:00:00.000Z', duration_minutes: 15, created_at: knex.fn.now(), updated_at: null, deleted_at: null},
    {id: '86a8f69e-ffcc-4c00-bf92-b02491fceac8', title: 'Monthly Task 38', description: 'Description for Monthly Task 38', due_at: '2024-05-08T03:00:00.000Z', duration_minutes: 15, created_at: knex.fn.now(), updated_at: null, deleted_at: null},
  ])

  await knex('tags').insert([
    {id:'e864def7-3ef8-4013-ab37-1e3ebfa1dbf1', name:'Tag number 1', color: '#FF9000', created_at: '2024-04-29 02:32:04', updated_at: null, deleted_at: null},
    {id:'7d70e150-ee22-4e13-b10f-4a4292b7fe27', name:'Tag number 2', color: '#2d9f3a', created_at: '2024-04-29 02:32:08', updated_at: null, deleted_at: null},
    {id:'2dfc3545-9466-4cce-b927-8b25873ee502', name:'Tag number 3', color: '#ff0000', created_at: '2024-04-29 02:45:44', updated_at: null, deleted_at: null},
  ]);
}
 