describe('黑盒测试用例1', () => {
  it('passes', () => {
    cy.visit('http://music.yujin123.cn/')
    cy.contains('排行').click()
    cy.wait(500)
    cy.get("a[href^='/playlist/']").first().click()
    cy.contains("飙升榜").should("exist")
    
  })
})