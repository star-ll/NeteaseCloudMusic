describe("功能测试1", () => {
	it("passes", () => {
		cy.visit('http://music.yujin123.cn/')
    cy.contains('搜索').click()
        cy.get("input[type=search]").type("说谎").type("{enter}")
        cy.wait(500)
        cy.get("input[type=search]").type("{backspace}{backspace}").type("周杰伦").type("{enter}")
        cy.wait(500)
        cy.get("input[type=search]").type("{backspace}{backspace}").type("十年").type("{enter}")
        cy.wait(500)
        cy.get("input[type=search]").type("{backspace}{backspace}{backspace}{backspace}{backspace}{backspace}").type("我").type("{enter}")
	});
});
