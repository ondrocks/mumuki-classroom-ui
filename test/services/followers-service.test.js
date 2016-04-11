
classroomTest('Followers Service', () => {

  var $Followers;

  beforeEach(inject((_Followers_) => {
    $Followers = _Followers_;
  }));

  describe('isFollowing', () => {
    context('when no followUps', () => {
      it('should not follow', () => {
        $Followers.isFollowing('k2001', 'fb100').should.be.false;
      });
    });

    context('when there are followUps', () => {
      beforeEach(() => { $Followers.setFollowUps({
        k2001: { social_ids: [] },
        k2002: { social_ids: ['fb100'] },
        k2003: { social_ids: ['fb200', 'fb201'] }
      })});

      it('should not follow unknown courses', () => {
        $Followers.isFollowing('k3001', 'fb100').should.be.false
      });

      it('should not follow unknown students in known, empty courses', () => {
        $Followers.isFollowing('k2001', 'fb100').should.be.false
      });

      it('should not follow unknown students in known, non-empty courses', () => {
        $Followers.isFollowing('k2002', 'fb600').should.be.false
      });

      it('should follow known students in known, non-empty courses', () => {
        $Followers.isFollowing('k2002', 'fb100').should.be.true;
      });

      it('should follow known students in known non-empty courses with many students', () => {
        $Followers.isFollowing('k2003', 'fb201').should.be.true;
      });
    });
  });


  describe('addFollower', () => {
    before(() => { $Followers.setFollowUps({
      k2001: { social_ids: [] },
      k2002: { social_ids: ['fb100'] },
      k2003: { social_ids: ['fb200', 'fb201'] }
    })});

    it('should be following after adding a new course', () => {
      $Followers.addFollower('k3001', 'fb100');
      $Followers.isFollowing('k3001', 'fb100').should.be.true
    });

    it('should be following after adding in an existing course', () => {
      $Followers.addFollower('k2001', 'fb100');
      $Followers.isFollowing('k2001', 'fb100').should.be.true
    });

    it('should be following after adding in an existing, populated course', () => {
      $Followers.addFollower('k2002', 'fb110');
      $Followers.isFollowing('k2002', 'fb110').should.be.true
    });
  });

  describe('removeFollower', () => {
    before(() => { $Followers.setFollowUps({
      k2001: { social_ids: [] },
      k2003: { social_ids: ['fb100'] }
    })});

    it('should not be following after remove from existing course', () => {
      $Followers.removeFollower('k2003', 'fb100');
      $Followers.isFollowing('k2003', 'fb100').should.be.false
    });

    it('should not be following after remove from inexistent course', () => {
      $Followers.removeFollower('k2004', 'fb100');
      $Followers.isFollowing('k2004', 'fb100').should.be.false
    });

    it('should not be following after remove inexistent user', () => {
      $Followers.removeFollower('k2003', 'fb500');
      $Followers.isFollowing('k2003', 'fb500').should.be.false
    });
  });
});


