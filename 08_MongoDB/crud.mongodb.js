// use("crudDB");

// db.createCollection("courses");

    // Creating in Database

        // db.courses.insertMany([
        //   { name: "CS-55", country: "London East", price: 10 },
        //   { name: "CS-65", country: "London West", price: 20 },
        //   { name: "CS-75", country: "London South", price: 30 },
        // ]);

    // Reading in Database

        // let data = db.courses.find({"name" : "CS-55"}) // Find One will give first result that will be matched
        // console.log(data)

    // Updating in Data

        // db.courses.updateOne({country : "London West"},
        //   {
        //     $set : {
        //       price: 500
        //     }
        //   }
        // )

    // Deleting in Data

        // db.courses.deleteOne({country : "London East"})