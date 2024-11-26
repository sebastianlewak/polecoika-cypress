describe("Clear Praises for Specific User", () => {
  it("should log in as admin and remove all praises for the specified user", () => {
    const senderUserID = "73287403-3cd8-4c9d-8467-eb8485863c34";

    cy.visit("/");
    cy.login({ as: "getAdminToken", login: "testhr", password: "testhr" });

    cy.wait("@getAdminToken").then((interception) => {
      const { access_token } = interception.response.body;

      cy.request({
        method: "POST",
        url: "/api/praise/find",
        qs: {
          page: 0,
          size: 1000000,
        },
        body: {},
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      }).then((response) => {
        expect(response.status).to.eq(200);
        const praises = response.body.content;

        praises.forEach((praise: any) => {
          if (praise.senderUser.id === senderUserID) {
            cy.request({
              method: "DELETE",
              url: `/api/praise/${praise.id}`,
              headers: {
                Authorization: `Bearer ${access_token}`,
              },
            }).then((deleteResponse) => {
              expect(deleteResponse.status).to.eq(204);
            });
          }
        });
      });
    });
  });
});
