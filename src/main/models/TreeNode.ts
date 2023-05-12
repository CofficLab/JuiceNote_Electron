class TreeNode {
    public id: number = 0
    public title: string = ''
    public isBook: boolean = false
    public isChapter: boolean = false
    public isTab: boolean = false
    public isPage: boolean = false
    public isLesson: boolean = true
    public isManual: boolean = false
    public isVisible: boolean = false
    public priority: number = 0
    public parentId: number = 0
    public level: number = 0
    public isEmpty: boolean = false
    public cover: string = ''
    public content: string = ''
    public tree: string = ''

    public constructor(dbResult: object, tree = 'local.db') {
        this.id = Object.getOwnPropertyDescriptor(dbResult, 'id')?.value
        this.title = Object.getOwnPropertyDescriptor(dbResult, 'title')?.value
        this.content = Object.getOwnPropertyDescriptor(dbResult, 'content')?.value
        this.isBook = Object.getOwnPropertyDescriptor(dbResult, 'is_book')?.value
        this.isChapter = Object.getOwnPropertyDescriptor(dbResult, 'is_chapter')?.value
        this.isTab = Object.getOwnPropertyDescriptor(dbResult, 'is_tab')?.value
        this.isPage = Object.getOwnPropertyDescriptor(dbResult, 'is_page')?.value
        this.isVisible = Object.getOwnPropertyDescriptor(dbResult, 'is_visible')?.value
        this.priority = Object.getOwnPropertyDescriptor(dbResult, 'priority')?.value
        this.level = Object.getOwnPropertyDescriptor(dbResult, 'level')?.value
        this.cover = Object.getOwnPropertyDescriptor(dbResult, 'cover')?.value
        this.parentId = Object.getOwnPropertyDescriptor(dbResult, 'parent_id')?.value
        this.tree = tree
    }
}

const EmptyNode = new TreeNode({})

export {
    TreeNode,
    EmptyNode,
};