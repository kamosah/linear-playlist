describe("Audio Player Component", () => {
  beforeEach(() => {
    cy.visit("/");
    // Need to interact with the page first due to autoplay restrictions
    cy.get("body").click();
  });

  it("displays Home page", () => {
    cy.contains("Playlists");
    cy.contains("2 Playlists • 95 min");
    cy.get('[data-testid="playlist-card"]')
      .should("have.length", 2)
      .first()
      .should("include.text", "Deep House");
  });

  it("basic functionality", () => {
    // Navigate to first playlist Deep House
    cy.get('[data-testid="playlist-card"]').first().click();
    cy.url().should("eq", "http://localhost:5173/playlist/1");
    cy.contains("2022 • 9 Songs, 53 min");

    // Click the first track [Breathe - Nul Tiel Records]
    cy.get('[data-testid="playlist-list-item"]').first().click();
    cy.get('[data-testid="song-info"]').should("contain.text", "Breathe", {
      timeout: 3_000,
    });

    // Play/Pause
    cy.isAudioPlaying().should("eq", false);
    cy.get('[data-testid="play-pause-button"]').click();
    cy.isAudioPlaying().should("eq", true);
    cy.get('[data-testid="play-pause-button"]').click();
    cy.isAudioPlaying().should("eq", false);

    // Next/Prev
    cy.get('[data-testid="next-button"]').click();
    cy.get('[data-testid="song-info"]').should(
      "contain.text",
      "Imagery Intelligence",
    );
    cy.get('[data-testid="previous-button"]').click();
    cy.get('[data-testid="song-info"]').should("contain.text", "Breathe");
  });
});
