
classroomTest('DevIcon Service', () => {

  describe('#from', () => {

    const shouldBe = (language, icon) => inject((DevIcon) => DevIcon.from(language).should.be.eql(icon));

    it('gobstones should have celluloid as devicon', shouldBe('gobstones', 'celluloid'));
    it('wollok should have webplatform as devicon', shouldBe('wollok', 'webplatform'));
    it('text should have code_badge as devicon', shouldBe('text', 'code_badge'));
    it('haskell should have haskell as devicon', shouldBe('haskell', 'haskell'));

  });


});
