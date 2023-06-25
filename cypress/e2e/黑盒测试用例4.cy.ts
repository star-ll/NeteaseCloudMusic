describe('黑盒测试用例1', () => {
  it('passes', () => {
    cy.visit('http://music.yujin123.cn/')
    cy.contains('搜索').click()
    cy.get("input[type=search]").type(" ").type("{enter}")
    
    cy.contains("歌曲不存在").should("exist")
  })
})