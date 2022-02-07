const TasksContract = artifacts.require("TasksContract");

contract("tasksContract", () => {
    before(async () => {
        this.instance = await TasksContract.deployed();
    });

    it('Migrate deployed succesfully', async () => {
        const address = this.instance.address;

        assert.notEqual(address, null);
        assert.notEqual(address, undefined);
        assert.notEqual(address, 0x0);
        assert.notEqual(address, "");
    });

    it('Get tasks list', async () => {
        const taskCounter = await this.instance.taskCounter();
        const task = await this.instance.tasks(taskCounter);

        assert.equal(task.id.toNumber(), taskCounter);
        assert.equal(task.title, "Primer tarea de ejemplo");
        assert.equal(task.description, "Descripcion tarea de ejemplo");
        assert.equal(task.state, false);
        assert.equal(taskCounter, 1);
    });

    it('Task created succesfully', async () => {
        const res = await this.instance.createTask("Task", "Task description");
        const taskEvent = res.logs[0].args;
        const taskCounter = await this.instance.taskCounter();

        assert.equal(taskCounter, 2);
        assert.equal(taskEvent.id.toNumber(), 2);
        assert.equal(taskEvent.title, "Task");
        assert.equal(taskEvent.description, "Task description");
        assert.equal(taskEvent.state, false);
    });

    it('Task toggle done', async () => {
        const result = await this.instance.toggleDone(1);
        const taskEvent = await result.logs[0].args;
        const task = await this.instance.tasks(1);

        assert.equal(task.state, true);
        assert.equal(taskEvent.id.toNumber(), 1);
        assert.equal(taskEvent.state, true);
    });
    
})