Object

newCity = {
    city: city,
    state: state
}

newCity.city
newCity.state

Array

newCity2 = [ city, state ]

newCity[0]
newCity[1]

obj = {
    name: "Kerry",
    friends: [ "Scott", "Musa" ],
    grade: 100,
    projects: {
        hw2: "portfolio",
        extras: [
            [ "scott", "musa" ],
            100, 
            { 
                hw1: "code", 
                hw2: "portfolio",
                extras: [ "p1", "p2" ],
                project1: {
                    v1: {
                        name: "Kerry",
                        projects: {
                            hw1: "code refactor",
                            hw2: "portfolio",
                            extras: [
                                "Kerry",
                                100, 
                                { 
                                    hw1: "code", 
                                    hw2: "portfolio",
                                    extras: [ "FTW", "p2" ],  // obj.projects.extras[2].project1.v1.projects.extras[2].extras[0]
                                    project1: {
                                        v1: "app1",
                                        v2: "app9000"
                                    }
                                }
                            ],
                            project1: {
                                v1: "app1",
                                v2: "app2"
                            }
                        }
                    }
                }
            }
        ]
    }
}

obj.projects.extras[3].project1.v2

//array square bracket/// objects dot notation
obj.projects.extras[1]   // "p2"
obj.projects.project1.v1 // "app1"
obj.friends[1]

arr = [
    "Kerry",
    [ "scott", "musa" ],
    100, 
    { 
        hw1: "code", 
        hw2: "portfolio",
        extras: [ "p1", "p2" ],
        project1: {
            v1: "app1",
            v2: "app2
        }
    }
]

arr[3].extras[1]   // "p2"
arr[3].project1.v1 //app1
arr[1][1]