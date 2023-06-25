describe('黑盒测试用例1', () => {
  it('passes', () => {
    cy.visit('http://music.yujin123.cn/')
    cy.contains('搜索').click()
    cy.get("input[type=search]").type("十年").type("{enter}")
    cy.get("div.text-base").click({
      multiple: true
    })
    cy.get("input[class^=_playButton_]").then((el) => {
      expect(el).exist
    })
    
  })
})