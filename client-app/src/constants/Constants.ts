
export class Constants {

    static readonly DrawerWidth: number = 240;
    static readonly DateFormat: Intl.DateTimeFormat = new Intl.DateTimeFormat(
        "en-US", {
        year: "numeric",
        month: "long",
        day: "2-digit"
      });
}