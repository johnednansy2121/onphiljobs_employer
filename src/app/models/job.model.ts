export interface JobModel {
    title: string,
    subtitle: string,
    section: [
        {
          title: string,
          description: string
        }
      ],
    details: {
      isWorkFromHome: boolean,
        location: {
          address1:  string,
          address2:  string,
          postalCode:  string,
          lat: number,
          long: number,
          city: string,
          state: string,
          country: string,
        }
        salary: {
          base: number,
          upper: number,
          currency: string,
          type: string
        },
    commitment: {
        type: string,
        duration: {
            quantity: number,
            unit: string
            }
        },
        category: string
    },
    premium: {
        isFeatured: boolean
    },
    status: string,
    metadata : {
        createdBy: string,
        client: string,
        organization: string,
        dateCreated: string,
        dateUpdated: string,
        publishedDate: string,
    }
}