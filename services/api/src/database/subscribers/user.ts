import { EventSubscriber, EntitySubscriberInterface, InsertEvent } from "typeorm";
import { User } from "@/database/entities/user";

@EventSubscriber()
export class UserSubscriber implements EntitySubscriberInterface<User> {
  /**
     * Indicates that this subscriber only listen to User events.
     */
  // listenTo(): new User {
  //   return User;
  // }

  /**
     * Called before User insertion.
     */
  beforeInsert(event: InsertEvent<User>): void {
    console.log("BEFORE User INSERTED: ", event.entity);
  }
}
