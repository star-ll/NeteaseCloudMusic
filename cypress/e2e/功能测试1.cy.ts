describe("功能测试1", () => {
	it("passes", () => {
		cy.visit("http://music.yujin123.cn/");
        cy.get("a[href*='/playlist']").first().click();
        cy.get("a.adm-list-item").first().click();
        cy.wait(1500)
        cy.get("input[class^=_playButton_]").first().click()
        cy.get("input[class^=_playButton_]").first().click()
        cy.get("input[class^=_playButton_]").first().click()
        cy.get("input[class^=_playButton_]").first().should("have.class","paused")
	});
});
