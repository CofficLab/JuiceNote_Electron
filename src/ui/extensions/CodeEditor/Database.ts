export class CodeBlock {
    public title: string;
    public content: string;
    public language: string;

    constructor({ title, content, language }: { title: string, content: string, language: string }) {
        this.title = title;
        this.content = content;
        this.language = language;
    }

    static create() {
        return new CodeBlock({
            title: 'new code block',
            content: Math.floor(Math.random() * 100) + " type here...\n\n\n\n",
            language: 'go',
        });
    }
}

export class Database {
    public json: string;
    public items: CodeBlock[] = [];
    public activatedIndex = 0;

    constructor(json: string = "{}") {
        this.json = json;
        this.activatedIndex = JSON.parse(this.json).activatedIndex || 0;

        const items = JSON.parse(this.json).items || [CodeBlock.create()];
        items.forEach((element: { title: string; content: string; language: string }) => {
            this.items.push(new CodeBlock(element));
        });
    }

    static createWithSingleCodeBlock(codeBlock: CodeBlock) {
        return new Database(JSON.stringify({
            items: [codeBlock],
            activatedIndex: 0,
        }));

    }

    public getActivatedItem(): CodeBlock {
        console.log('get activated item', this);
        if (this.items && this.items.length > 0 && this.activatedIndex >= 0 && this.activatedIndex < this.items.length) {
            console.log(this.items[this.activatedIndex]);
            return this.items[this.activatedIndex];
        } else {
            return new CodeBlock({
                title: 'new code block',
                content: 'type here',
                language: 'go',
            });
        }
    }


    public getLastIndex(): number {
        return this.items.length - 1;
    }

    public appendNewCodeBlock(): Database {
        this.items.push(CodeBlock.create());
        this.activatedIndex = this.items.length - 1;

        return this;
    }

    public toJSON(): string {
        return JSON.stringify({
            items: this.items,
            activatedIndex: this.activatedIndex,
        });
    }

    public updateActivatedIndex(id: String): Database {
        this.json = JSON.stringify({
            activatedIndex: id,
            items: this.items,
        });

        return new Database(this.json);
    }

    public updateLanguage(language: string): Database {
        console.log('database: update language', language);
        let activatedItem = this.getActivatedItem()
        activatedItem.language = language

        this.items[this.activatedIndex] = activatedItem

        this.json = JSON.stringify({
            items: this.items,
            activatedIndex: this.activatedIndex,
        })

        console.log('database: after update language', this.json);

        return new Database(this.json);
    }

    public deleteCodeBlock(index: number): Database {
        this.items.splice(index, 1);

        this.json = JSON.stringify({
            items: this.items,
            activatedIndex: Math.max(0, index - 1),
        })

        return new Database(this.json);
    }
}
