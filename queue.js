/*  Info on queue template
    (cite: https://dmitripavlutin.com/javascript-queue/)
*/
export default class Queue{
    constructor(){
        this.item = {};
        this.head = 0;
        this.tail = 0;
    }

    enqueue(item){
        this.item[this.tail] = item;
        this.tail++;
    }
    
    dequeue(){
        const item = this.item[this.head];
        delete this.item[this.head];
        this.head++;
        return item;
    }

    peekTail(){
        return this.item[this.tail];
    }

    get length(){
        return this.tail - this.head;
    }
}
