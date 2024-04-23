export function getHeaderText(step: string): string{
    switch (step) {
      case "1":
        return "Complete Account Information";
      case "2":
        return "Choose Your Favorite Theater";
      case "3":
        return "Set Your Movie Preferences";
      default:
        return "Complete Sign Up";
    } 
  }