import Lesson from '../pages/Lesson.vue'
import Home from '../pages/Home.vue'
import { RouteRecordRaw } from 'vue-router'

const lessonsRoutes: RouteRecordRaw =
{
    path: '/lessons/:id',
    children: [
        {
            path: 'edit',
            component: Lesson,
            name: "lessons.edit"
        },
        {
            path: 'show',
            component: Lesson,
            name: "lessons.show"
        },
    ]
}

export default lessonsRoutes