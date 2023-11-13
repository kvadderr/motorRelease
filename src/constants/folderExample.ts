import { Folder } from "../@types/entities/Folder";

export const folderExample: Folder[] = [
    {
        name: 'Рабочие контакты',
        id: 1,
    },
    {
        name: 'Айгерим',
        id: 2,
    },
    {
        name: 'Прыжки в сторону',
        id: 3,
        parent_id: 1
    },
    {
        name: 'Прыжки c парашютом',
        id: 4,
        parent_id: 1
    },
    {
        name: 'Угон катера',
        id: 5,
        parent_id: 3
    },
]