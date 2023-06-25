describe('黑盒测试用例1', () => {
  it('passes', () => {
    cy.visit('http://music.yujin123.cn/')
    cy.contains('搜索').click()
    cy.get("input[type=search]").type("十").type("{enter}")
    console.log(cy.contains("十年"));
    
    cy.contains("十年").should("exist")
  })
})