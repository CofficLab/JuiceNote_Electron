import Lesson from '../pages/Lesson.vue'
import { RouteRecordRaw } from 'vue-router'

const lessonsRoutes: RouteRecordRaw =
{
    path: '/local',
    children: [
        {
            path: 'lessons/:id',
            children: [
                {
                    path: 'edit',
                    component: Lesson,
                    name: "local.lessons.edit"
                },
                {
                    path: 'show',
                    component: Lesson,
                    name: "local.lessons.show"
                },
            ]
        }
    ]
}

export default lessonsRoutes