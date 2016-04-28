package main

/*

	Gianmarco Iapoce - Fujitsu	
	15/04/2016

*/

import (
    "fmt"
    "log"
    "time"
    "os"
    "io/ioutil"
    "net/http"
    "encoding/json"
    "gopkg.in/mgo.v2"
    "gopkg.in/mgo.v2/bson"
    "github.com/gorilla/mux"
)


type Profile struct {
        Id              bson.ObjectId  `bson:"_id,omitempty"`
	Username 	string	       `bson: "username"`
	Password 	string	       `bson: "password"`
	Database 	string	       `bson: "database"`
	LastUpdated     string         `bson: "lastupdated"`
}

type Database struct {
        Id              bson.ObjectId  `bson:"_id,omitempty"`
	Database 	string	       `bson: "database"`
	Enviroment      string         `bson: "enviroment"`
}



func GetDatabases() []Database {


	session, err := mgo.Dial("localhost")
	if err != nil {
		log.Println("Get Databases - Could not connect to mongo: ", err.Error())
		return nil
	}
	defer session.Close()

	session.SetMode(mgo.Monotonic, true)

	c := session.DB("ProfileService").C("Databases")
	var databases []Database
	err = c.Find(bson.M{}).All(&databases)
        if err != nil {
                log.Println("Error retrieving databases: ", err.Error())
        }

	return databases

}

func ShowDatabase(id string) Database {

	session, err := mgo.Dial("localhost")
	if err != nil {
		log.Println("Show Database - Could not connect to mongo: ", err.Error())
		return Database{}
	}
	defer session.Close()

	session.SetMode(mgo.Monotonic, true)

	c := session.DB("ProfileService").C("Databases")
	database := Database{}
        if !bson.IsObjectIdHex(id) {
        	return Database{}
    	}
        oid := bson.ObjectIdHex(id)
	err = c.Find(bson.M{"_id": oid}).One(&database)
        if err != nil {
		return Database{}
	}

	return database

}

func DeleteDatabase(id string) bool {

	session, err := mgo.Dial("localhost")
	if err != nil {
		log.Println("Delete Database - Could not connect to mongo: ", err.Error())
		return false
	}
	defer session.Close()

	session.SetMode(mgo.Monotonic, true)

	c := session.DB("ProfileService").C("Databases")

        if !bson.IsObjectIdHex(id) {
          return false
        }

        oid := bson.ObjectIdHex(id)

	if err := c.RemoveId(oid); err != nil {
	    log.Println("Error deleteting Database", err.Error())
	    return false
	}

	return true
}

func CreateDatabase(d *Database) bool {

	session, err := mgo.Dial("localhost")
	if err != nil {
		log.Println("Create database - Could not connect to mongo: ", err.Error())
		return false
	}
	defer session.Close()

	session.SetMode(mgo.Monotonic, true)
	c := session.DB("ProfileService").C("Databases")

         var db interface{}
         if err = c.FindId(d.Id).One(&db); err != nil {

                 log.Println("New Database")
                 d.Id = bson.NewObjectId()
                 err = c.Insert(d)

        }  else {

                 log.Println("Updating existing database")
                 err = c.UpdateId(d.Id,d)

        }

	if err != nil {
		log.Println("Error creating Database: ", err.Error())
		return false
	}
	return true

}

func UpdateDatabase(d *Database) bool {

        session, err := mgo.Dial("localhost")
        if err != nil {
                log.Println("Create database - Could not connect to mongo: ", err.Error())
                return false
        }
        defer session.Close()

        session.SetMode(mgo.Monotonic, true)
        c := session.DB("ProfileService").C("Databases")


        log.Println("Updating existing database")
        err = c.UpdateId(d.Id,d)

        if err != nil {
                log.Println("Error creating Database: ", err.Error())
                return false
        }
        return true

}

func GetProfiles() []Profile {


	session, err := mgo.Dial("localhost")
	if err != nil {
		log.Println("Get Profiles - Could not connect to mongo: ", err.Error())
		return nil
	}
	defer session.Close()

	session.SetMode(mgo.Monotonic, true)

	c := session.DB("ProfileService").C("Profiles")
	var profiles []Profile
	err = c.Find(bson.M{}).All(&profiles)
        if err != nil {
                log.Println("Error retrieving profiles: ", err.Error())
        }

	return profiles

}


func ShowProfile(id string) Profile {

	session, err := mgo.Dial("localhost")
	if err != nil {
		log.Println("Show Profile - Could not connect to mongo: ", err.Error())
		return Profile{}
	}
	defer session.Close()

	session.SetMode(mgo.Monotonic, true)

	c := session.DB("ProfileService").C("Profiles")
	profile := Profile{}
        if !bson.IsObjectIdHex(id) {
        	return Profile{}
    	}
        oid := bson.ObjectIdHex(id)
	err = c.Find(bson.M{"_id": oid}).One(&profile)
        if err != nil {
		return Profile{}
	}

	return profile
}


func DeleteProfile(id string) bool {

	session, err := mgo.Dial("localhost")
	if err != nil {
		log.Println("Delete Profile - Could not connect to mongo: ", err.Error())
		return false
	}
	defer session.Close()

	session.SetMode(mgo.Monotonic, true)

        if !bson.IsObjectIdHex(id) {
          return false
        }

	c := session.DB("ProfileService").C("Profiles")
        oid := bson.ObjectIdHex(id)

        if err := c.RemoveId(oid); err != nil {
            log.Println("Error deleteting Profile", err.Error())
            return false
        }
	
	return true
}


func CreateProfile(p *Profile) bool {

	session, err := mgo.Dial("localhost")
	if err != nil {
		log.Println("Create Profile - Could not connect to mongo: ", err.Error())
		return false
	}
	defer session.Close()

	session.SetMode(mgo.Monotonic, true)
	c := session.DB("ProfileService").C("Profiles")

        t := time.Now()
        currTime := fmt.Sprintf("%02d/%02d/%04d %02d:%02d:%02d", t.Day(), t.Month(), t.Year(), t.Hour(), t.Minute(), t.Second())
        p.LastUpdated=currTime

        var prof interface{} 
        if err = c.FindId(p.Id).One(&prof); err != nil {
	
		 log.Println("New Profile")
		 p.Id = bson.NewObjectId()
        	 err = c.Insert(p)
	
	}  else {
	
		 log.Println("Updating existing profile")
        	 err = c.UpdateId(p.Id,p)

	}      

	if err != nil {
		log.Println("Error creating or updating Profile: ", err.Error())
		return false
	}
	return true
}

func UpdateProfile(p *Profile) bool {

        session, err := mgo.Dial("localhost")
        if err != nil {
                log.Println("Create Profile - Could not connect to mongo: ", err.Error())
                return false
        }
        defer session.Close()

        session.SetMode(mgo.Monotonic, true)
        c := session.DB("ProfileService").C("Profiles")
	
        t := time.Now()
        currTime := fmt.Sprintf("%02d/%02d/%04d %02d:%02d:%02d", t.Day(), t.Month(), t.Year(), t.Hour(), t.Minute(), t.Second())
        p.LastUpdated=currTime

        log.Println("Updating existing profile")
        err = c.UpdateId(p.Id,p)

        if err != nil {
                log.Println("Error creating or updating Profile: ", err.Error())
                return false
        }
        return true
}


func ProfilesHandler(response http.ResponseWriter, request *http.Request)  {


   response.Header().Set("Content-type", "text/json")
   response.Header().Set("Pragma", "no-cache")
   response.Header().Set("Cache-Control", "no-cache")
   response.Header().Set("Expires","-1")

   log.Println(request.Method)

   switch request.Method {

        case "GET":


           var profiles []Profile = GetProfiles()
            
            if profiles == nil {
	    
                response.WriteHeader(http.StatusRequestedRangeNotSatisfiable)
 	        fmt.Fprintf(response,"%s","Database is empty or unavailable") 
                return 

	    }

            json, err := json.Marshal(profiles)
	    if err != nil {

        	fmt.Fprintf(response,"%s",err)
	        return 

    	    }

         fmt.Fprintf(response,"%v",string(json))             
       
        case "POST":
  

	  p := new(Profile)
          if err := json.NewDecoder(request.Body).Decode(p); err != nil {
             
             log.Println("Error parsing body request")
             response.WriteHeader(http.StatusInternalServerError)
 	     fmt.Fprintf(response,"%s","Custom 503") 
             return

          }

        
	  r := CreateProfile(p)
	  if !r {

                log.Println("Error creating profile")
                response.WriteHeader(http.StatusInternalServerError)
 	        fmt.Fprintf(response,"%s","Custom 503") 
                return

	  }

             
          default:

    }
    

}

func ProfileHandler(response http.ResponseWriter, request *http.Request){

 response.Header().Set("Content-type", "text/json")
 response.Header().Set("Pragma", "no-cache")
 response.Header().Set("Cache-Control", "no-cache")
 response.Header().Set("Expires","-1")

 log.Println(request.Method)

 vars := mux.Vars(request)
 id := vars["id"]

 switch request.Method {

     case "GET":
    
       p := ShowProfile(id);

       json, err := json.Marshal(p)
       if err != nil {
          fmt.Fprintf(response,"%s",err)
          return 
       }

       fmt.Fprintf(response,"%v",string(json))             

     case "PUT":

	  p := new(Profile)
          if err := json.NewDecoder(request.Body).Decode(p); err != nil {

             log.Println("Error parsing body request")
             response.WriteHeader(http.StatusInternalServerError)
             fmt.Fprintf(response,"%s","Custom 503")
             return

          }

	  r :=UpdateProfile(p)
          if !r {

                log.Println("Error updating profile")
                response.WriteHeader(http.StatusInternalServerError)
                fmt.Fprintf(response,"%s","Custom 503")
                return

          }


     case "DELETE":
            
          rc := DeleteProfile(id)
	  if (!rc) {
                response.WriteHeader(http.StatusInternalServerError)
                fmt.Fprintf(response,"%s","Custom 503")
                return
	  }

           response.WriteHeader(http.StatusOK)
           fmt.Fprintf(response,"%s","202")

     default:
 
  }


}


func DatabasesHandler(response http.ResponseWriter, request *http.Request){

   response.Header().Set("Content-type", "text/json")
   response.Header().Set("Pragma", "no-cache")
   response.Header().Set("Cache-Control", "no-cache")
   response.Header().Set("Expires","-1")

   log.Println(request.Method)

   switch request.Method {

        case "GET":


         var databases []Database = GetDatabases()

            if databases == nil {

                response.WriteHeader(http.StatusRequestedRangeNotSatisfiable)
 	        fmt.Fprintf(response,"%s","Database is empty or unavailable") 
                return

            }

            json, err := json.Marshal(databases)
            if err != nil {
                fmt.Fprintf(response,"%s",err)
                return
            }

         fmt.Fprintf(response,"%v",string(json))


        case "POST":


          d := new(Database)
          if err := json.NewDecoder(request.Body).Decode(d); err != nil {
             response.WriteHeader(http.StatusInternalServerError)
             fmt.Fprintf(response,"%s","Custom 503")
             return
          }


          r := CreateDatabase(d)
          if !r {

                response.WriteHeader(http.StatusInternalServerError)
                fmt.Fprintf(response,"%s","Custom 503")
                return

          }


          default:

    }


}

func DatabaseHandler(response http.ResponseWriter, request *http.Request){

 response.Header().Set("Content-type", "text/json")
 response.Header().Set("Pragma", "no-cache")
 response.Header().Set("Cache-Control", "no-cache")
 response.Header().Set("Expires","-1")

 log.Println(request.Method)
	
 vars := mux.Vars(request)
 id := vars["id"]

 switch request.Method {

     case "GET":

        d := ShowDatabase(id);

        json, err := json.Marshal(d)
        if err != nil {
            fmt.Fprintf(response,"%s",err)
            return
        }

       fmt.Fprintf(response,"%v",string(json))             

     case "PUT":

          d := new(Database)
          if err := json.NewDecoder(request.Body).Decode(d); err != nil {

             log.Println("Error parsing body request")
             response.WriteHeader(http.StatusInternalServerError)
             fmt.Fprintf(response,"%s","Custom 503")
             return

          }

          r :=UpdateDatabase(d)
          if !r {

                log.Println("Error updating database")
                response.WriteHeader(http.StatusInternalServerError)
                fmt.Fprintf(response,"%s","Custom 503")
                return

          }

     case "DELETE":

          rc := DeleteDatabase(id)
          if (!rc) {
                response.WriteHeader(http.StatusInternalServerError)
                fmt.Fprintf(response,"%s","Custom 503")
                return
          }

               response.WriteHeader(http.StatusOK)
               fmt.Fprintf(response,"%s","202")

     default:

  }


}

func LoginHandler(response http.ResponseWriter, request *http.Request){

    response.Header().Set("Content-type", "text/html")
    WEB_ROOT,err := os.Getwd()
    if err != nil {
        fmt.Println(err)
        os.Exit(1)
    }  

    webpage, err := ioutil.ReadFile(WEB_ROOT + "/login.html")
    if err != nil {
         http.Error(response, fmt.Sprintf("login.html file error %v", err), 500)
    }

    fmt.Fprint(response, string(webpage));

}

func main() {


    address := ":80"
    log.Printf("Starting Server listening on %s\n", address)
     
    WEB_ROOT,err := os.Getwd()
    if err != nil {
        fmt.Println(err)
        os.Exit(1)
    }  
    
     
     fs := http.FileServer(http.Dir(WEB_ROOT))
     mx := mux.NewRouter()

     mx.Handle("/login", http.HandlerFunc( LoginHandler ))
     mx.Handle("/profiles", http.HandlerFunc( ProfilesHandler ))
     mx.Handle("/profiles/{id}", http.HandlerFunc( ProfileHandler ))
     mx.Handle("/databases", http.HandlerFunc( DatabasesHandler ))
     mx.Handle("/databases/{id}", http.HandlerFunc( DatabaseHandler ))

     mx.PathPrefix("/").Handler(fs)
     http.Handle("/", mx)


    err = http.ListenAndServe(address, nil)
    if err != nil {
        log.Fatal("ListenAndServe error: ", err)
    }


}
